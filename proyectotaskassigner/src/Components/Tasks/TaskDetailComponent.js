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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const TaskDetailsComponent = () => {
  const [task, setTask] = useState(null);
  const [participants, setParticipants] = useState([]); // Assuming participants are returned with task data
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const [newComment, setNewComment] = useState("");
  const [userId, setUserId] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState("");
  const navigate = useNavigate();
  if (!getAuthToken()) {
    navigate("/login");
  }
  const headers = {
    Authorization: `Bearer ${getAuthToken()}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    // Fetch task details and comments when component mounts
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
      setParticipants(responseTask.data.participants.map((p) => ({name:p.user.name + ' ' +p.user.lastName, role:p.taskRole})));
      setComments(
        responseComments.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        )
      ); // Assuming comments are returned with task data
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
      ); // Add new comment to the list
      setNewComment(""); // Clear the comment input field
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
    if(!newContent.trim()) return alert("El comentario no puede estar vacio ni puede ser igual al anterior");
    
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
  var showComment = (comment) => {
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
            Actualizar
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
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };
  return (
    <Grid container spacing={2}>
      {task && (
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <Typography variant="h5">Task Details</Typography>
            <Typography>ID: {task.id}</Typography>
            <Typography>Descipcion: {task.name}</Typography>
            <Typography>Fecha de Creacion: {formatDate(task.initialDate)}</Typography>
            <Typography>Fecha Vencimiento: {formatDate(task.finalDate)}</Typography>
            <Typography>Proyecto: {task.project.name }</Typography>
            <Typography>Prioridad: {task.priority}</Typography>
            <Typography>Estado: {task.status}</Typography>
            <Typography>Desarrollador: {participants.find(p=>p.role == 'Dev')?.name}</Typography>
            <Typography>Manager: {participants.find(p=>p.role == 'Manager')?.name}</Typography>
          </Paper>
        </Grid>
      )}
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography variant="h5">Comments</Typography>
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
            variant="contained"
            color="primary"
            onClick={handleCommentSubmit}
          >
            Add Comment
          </Button>
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
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TaskDetailsComponent;
