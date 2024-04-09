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

    return <TaskList tasks={tasks}></TaskList>;
}

export default TaskListAsigned;