import { useEffect,useState } from "react";  
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
import TaskList from "./TaskList";
const TasksFromProject = () => {

    const [tasks, setTasks] = useState([]);
    const { id } = useParams();
   
     useEffect(() => {
            axios.get(
                `https://localhost:7153/api/Projects/${id}/tasksFromProject`,
                {
                    headers:
                    {   
                        'Content-Type': 'application/json',
                    }
                }
            ).then((response) => {
                setTasks(response.data);
            }
            ).catch((error) => {
                console.error('Error al obtener la informaci�n de las tareas');
            })
        }
        , []);
    return <TaskList tasks={tasks}></TaskList>;
};

export default TasksFromProject;