import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getDecodedToken } from '../../Services/AuthService';
import axios from 'axios';

function TaskList({ tasks , handleDelete}) {
  const navigate = useNavigate();
  

  const groupTasksByStatus = () => {
    const groupedTasks = {};
    tasks.forEach(task => {
      if (!groupedTasks[task.status]) {
        groupedTasks[task.status] = [];
      }
      groupedTasks[task.status].push(task);
    });
    return groupedTasks;
  };

  

  const renderTasksByStatus = () => {
    const groupedTasks = groupTasksByStatus();
    const statusList = Object.keys(groupedTasks);

    return statusList.map(status => (
        <div key={status}>
            <div className="accordion" id={`accordion-${status}`}>
                <div className="accordion-item">
                    <h2 className="accordion-header" id={`heading-${status}`}>
                        <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse-${status}`}
                            aria-expanded="true"
                            aria-controls={`collapse-${status}`}
                        >

                            {status}
                        </button>
                    </h2>
                    <div
                        id={`collapse-${status}`}
                        className="accordion-collapse collapse show"
                        aria-labelledby={`heading-${status}`}
                        data-bs-parent={`#accordion-${status}`}
                    >
                        <div className="accordion-body">
                            {groupedTasks[status].map(task => (
                                <div key={task.id} className="d-flex justify-content-between align-items-center mb-3">
                                    <h5>{task.name}</h5>
                                    <div>

                                    <button className="btn btn-outline-success btn mx-2" onClick={() => navigate('/tareas/' + task.id)}><i className="bi bi-eye"> Ver</i></button>
                                    <button className="btn btn-outline-danger btn" onClick={() => handleDelete(task.id)}><i className="bi bi-trash"> Eliminar</i></button>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>

    ));
    };

    return (
        <div className="container mt-5">
            <div>
                <h1 className="text-center text-primary display-4">Tareas</h1>
                <hr className="text-primary" />
            </div>
            <div className="mt-4">
                {getDecodedToken().role === 'Admin' && (
                    <button className="btn btn-success mb-3" onClick={() => navigate('/tareas/create')}>
                        <i className="bi bi-file-earmark-plus"> Crear Tarea</i> 
                    </button>
                )}
                    {renderTasksByStatus()}
            </div>
        </div>
    );
}

export default TaskList;
