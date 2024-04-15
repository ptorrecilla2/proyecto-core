import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAuthToken } from "../../Services/AuthService";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  MenuItem,
} from "@mui/material";
import { Edit, Delete, Save, Cancel } from "@mui/icons-material";

const TaskDetailsComponent = () => {
  const [task, setTask] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const [newComment, setNewComment] = useState("");
  const [userId, setUserId] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState("");
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [editedTask, setEditedTask] = useState(null);
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [statusOptions, setStatusOptions] = useState({});
  const [priorityOptions, setPriorityOptions] = useState({});
  
  const navigate = useNavigate();

  if (!getAuthToken()) {
    navigate("/login");
  }
  const headers = {
    Authorization: `Bearer ${getAuthToken()}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    fetchTaskDetails();
  }, []);

  const fetchTaskDetails = async () => {
    try {
      const responseUser = await axios.post(
        "https://localhost:7153/api/Users/userInfo",
        null,
        {
          headers,
        }
      );
      setUserId(responseUser.data.user.id);
      const responseTask = await axios.get(
        `https://localhost:7153/api/ProjectTasks/${id}`,
        { headers }
      );
      const responseComments = await axios.get(
        `https://localhost:7153/api/Comments/${id}`,
        { headers }
      );
      setTask(responseTask.data.projectTask);
      setParticipants(responseTask.data.participants.map((p) => ({name:p.user.name + ' ' +p.user.lastName, role:p.user.role.type})));
      setStatusOptions(responseTask.data.statusDictionary);
      setPriorityOptions(responseTask.data.priorityDictionary);
      setPriority(responseTask.data.projectTask.priority);
      setStatus(responseTask.data.projectTask.status);
      setComments(
        responseComments.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        )
      );
      
    } catch (error) {
      console.error("Error fetching task details:", error);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post(
        `https://localhost:7153/api/Comments/`,
        { description: newComment, date: new Date(), userId, taskId: id },
        { headers }
      );
      setComments(
        [...comments, response.data].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        )
      );
      setNewComment("");
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      await axios.delete(`https://localhost:7153/api/Comments/${commentId}`);
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleCommentEdit = (commentId) => {
    setEditingCommentId(commentId);
  };

  const handleCommentEditSubmit = async (commentId, newContent) => {
    if (!newContent.trim()) return alert("El comentario no puede estar vacio ni puede ser igual al anterior");

    try {
      await axios.put(
        `https://localhost:7153/api/Comments/${commentId}`,
        { id:commentId,description: newContent, date: new Date(), userId, taskId: id },
        { headers }
      );
      setComments(
        comments
          .map((comment) =>
            comment.id === commentId
              ? { ...comment, description: newContent}
              : comment
          )
          .sort((a, b) => new Date(b.date) - new Date(a.date))
      );
      setEditingCommentId(null);
      setEditingCommentContent("");
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const handleTaskEdit = () => {
    setIsEditingTask(true);
    setEditedTask({ ...task , initialDate: task.initialDate.substring(0, task.initialDate.indexOf("T")), finalDate: task.finalDate.substring(0, task.finalDate.indexOf("T") )});
  };

  const handleTaskCancel = () => {
    setIsEditingTask(false);
  };

  const handleTaskSave = async () => {
    try {
      await axios.put(
        `https://localhost:7153/api/ProjectTasks/${id}`,
        editedTask,
        { headers }
      );
      setIsEditingTask(false);
      setTask({ ...editedTask});
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  
  const showComment = (comment) => {
    if (editingCommentId === comment.id) {
      return (
        <TextField
          label="Edit Comment"
          variant="outlined"
          value={editingCommentContent || comment.description}
          onChange={(e) => setEditingCommentContent(e.target.value)}
          fullWidth
          multiline
          rows={3}
          margin="normal"
        />
      );
    }
    return <ListItemText primary={comment.description} />;
  };
  
  const showButtons = (comment) => {
    if (editingCommentId === comment.id) {
      return (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              handleCommentEditSubmit(comment.id, editingCommentContent)
            }
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setEditingCommentId(null)}
          >
            Cancel
          </Button>
        </>
      );
    }
    return (
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="edit"
          onClick={() => handleCommentEdit(comment.id)}
        >
          <Edit />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => handleCommentDelete(comment.id)}
        >
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    );
  };
  const handlePriorityChange = (event) => {
    setEditedTask({ ...editedTask, priority: event.target.value });
  };
  
  const handleStatusChange = (event) => {
    setEditedTask({ ...editedTask, status: event.target.value });
  };
  
  const handleInitialDateChange = (event) => {
    setEditedTask({ ...editedTask, initialDate: event.target.value });
  };
  
  const handleFinalDateChange = (event) => {
    setEditedTask({ ...editedTask, finalDate: event.target.value });
    };

    return (
        <>
            <div className="container mt-5 mb-5">
                <div className="text-center mb-5">
                    <h1 className="text-primary">Tareas & Comentarios </h1>
                    <hr className="text-primary" />
                </div>
                <Grid container spacing={2}>
                        {task && (
                            <Grid item xs={12}>
                                <Paper elevation={3} style={{ padding: 20 }}>
                                    <Typography variant="h5" style={{ color: '#48C9B0' }} className="mb-3">Detalles de la Tarea</Typography>
                                    {!isEditingTask ? (
                                        <>
                                            <Typography className="d-flex justify-content align-items mb-1"> <h6 className="me-2">Descripcion:</h6> {task.name}</Typography>
                                            <Typography className="d-flex justify-content align-items mb-1"><h6 className="me-2">Fecha de Creacion: </h6> {formatDate(task.initialDate)}</Typography>
                                            <Typography className="d-flex justify-content align-items mb-1"><h6 className="me-2">Fecha Vencimiento: </h6>  {formatDate(task.finalDate)}</Typography>
                                            <Typography className="d-flex justify-content align-items mb-1"><h6 className="me-2">Proyecto:</h6> {task.project.name}</Typography>
                                            <Typography className="d-flex justify-content align-items mb-1"> <h6 className="me-2">Prioridad: </h6>{task.priority}</Typography>
                                            <Typography className="d-flex justify-content align-items mb-1"><h6 className="me-2">Estado: </h6>{task.status}</Typography>
                                            <Typography className="d-flex justify-content align-items mb-1"><h6 className="me-2">Desarrollador:</h6> {participants.find(p => p.role == 'Dev')?.name}</Typography>
                                            <Typography className="d-flex justify-content align-items mb-1"><h6 className="me-2">Manager: </h6>{participants.find(p => p.role == 'Manager')?.name}</Typography>
                                  <Button
                                      className="mt-3"
                                      variant="contained"
                                      color="primary"
                                      style={{ backgroundColor: '#48C9B0', color: '#fff' }}
                                      onClick={handleTaskEdit}

                                  >
                                      Editar
                                  </Button>
                              </>
                          ) : (
                              <>
                                  <TextField
                                      label="Descripcion"
                                      value={editedTask.name}
                                      onChange={(e) =>
                                          setEditedTask({ ...editedTask, name: e.target.value })
                                      }
                                      fullWidth
                                      margin="normal"
                                  />
                                  <TextField
                                      label="Fecha de Creacion"
                                      type="date"
                                      value={ editedTask.initialDate}
                                      onChange={handleInitialDateChange}
                                      
                                      fullWidth
                                      margin="normal"
                                  />
                                  <TextField
                                      label="Fecha Vencimiento"
                                      type="date"
                                      value={editedTask.finalDate}
                                      onChange={handleFinalDateChange}
                                      fullWidth
                                      margin="normal"
                                  />
                                  <TextField
                                      label="Proyecto"
                                      value={editedTask.project.name}
                                      disabled
                                      fullWidth
                                      margin="normal"
                                  />
                                  <TextField
                                      label="Prioridad"
                                      select
                                      value={editedTask.priority}
                                      onChange={handlePriorityChange}
                                      fullWidth
                                      margin="normal"
                                  >
                                      {Object.keys(priorityOptions).map((priorityKey) => (
                                          <MenuItem key={priorityKey} value={priorityKey}>
                                              {priorityKey}
                                          </MenuItem>
                                      ))}
                                  </TextField>
                                  <TextField
                                      label="Estado"
                                      select
                                      value={editedTask.status}
                                      onChange={handleStatusChange}
                                      fullWidth
                                      margin="normal"
                                  >
                                      {Object.keys(statusOptions).map((statusKey) => (
                                          <MenuItem key={statusKey} value={statusKey}>
                                              {statusKey}
                                          </MenuItem>
                                      ))}
                                  </TextField>
                                  <TextField
                                      label="Desarrollador"
                                      value={participants.find(p => p.role == 'Dev')?.name}
                                      disabled
                                      fullWidth
                                      margin="normal"
                                  />
                                  <TextField
                                      label="Manager"
                                      value={participants.find(p => p.role == 'Manager')?.name}
                                      disabled
                                      fullWidth
                                      margin="normal"
                                            />
                                            <div className="mt-3">
                                                <Button
                                                      className="me-2"
                                                      variant="contained"
                                                      color="primary"
                                                      onClick={handleTaskSave}
                                                  >
                                                      Guardar
                                                  </Button>
                                                <Button
                                                      className="me-2"
                                                      variant="contained"
                                                      color="secondary"
                                                      onClick={handleTaskCancel}
                                                  >
                                                      Cancelar
                                                </Button>
                                            </div>

                              </>
                          )}
                      </Paper>
                  </Grid>
                     )}
                      <Grid item xs={12}>
                        <Paper elevation={3} style={{ padding: 20 }}>
                            <Typography variant="h5"  className="mb-3" style={{ color: '#2980B9' }}>Comentarios</Typography>
                              <TextField
                                  label="Add Comment"
                                  variant="outlined"
                                  value={newComment}
                                  onChange={(e) => setNewComment(e.target.value)}
                                  fullWidth
                                  multiline
                                  rows={3}
                                  margin="normal"
                              />
                            <Button
                                className="mt-3"
                                variant="contained"
                                color="primary"
                                style={{ backgroundColor: '#2980B9', color: '#fff' }}
                                onClick={handleCommentSubmit}
                              >
                                  Agregar Comentario
                            </Button>
                            <div className="container mt-3">
                              <List>
                                  {comments.map((comment) => (
                                      <div key={comment.id + id}>
                                          <Typography key={comment.id + id} variant="h8">
                                              Creado por {comment.user?.name} el {formatDate(comment.date)}
                                          </Typography>
                                         
                                          <ListItem key={comment.id}>{showComment(comment)}
                                              {showButtons(comment)}
                                          </ListItem>
                                         
                                      </div>
                                  ))}
                                </List>
                              </div>
                          </Paper>
                      </Grid>
                </Grid>
            </div >
      </>
  );
};

export default TaskDetailsComponent;
