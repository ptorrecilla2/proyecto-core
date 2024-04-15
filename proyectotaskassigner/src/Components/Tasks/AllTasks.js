import { useEffect,useState } from "react";  
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
import TaskList from "./TaskList";



const TaskListAsigned = () => {
    const [tasks, setTasks] = useState([]);
    const authToken = localStorage.getItem('authToken');
    const navigate = useNavigate();
    

    useEffect(() => {
        if (!authToken) {
            //Navegar a Login
            navigate('/login');
        }
        axios.get(
            `https://localhost:7153/api/ProjectTasks`,
            {
                headers:
                {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                    
                }
            }
        ).then((response) => {
            setTasks(response.data);
        }).catch((error) => {

        console.error('Error al obtener la informaci�n del usuario');
        })
    }, []);

    const handleDelete = (id) => {
        axios.delete(`https://localhost:7153/api/ProjectTasks/${id}`)
        .then((response) => {
            //actualizar la lista de tareas eliminando la tarea con el id proporcionado sin usar estados
            setTasks(tasks.filter(task => task.id !== id));
    
    
            
        })
        .catch((error) => {
            console.error(`Error al eliminar el usuario con ID: ${id}`);
        });
        console.log(`Delete task with ID: ${id}`);
    };

    return <TaskList tasks={tasks} handleDelete={handleDelete}></TaskList>;
}

export default TaskListAsigned;