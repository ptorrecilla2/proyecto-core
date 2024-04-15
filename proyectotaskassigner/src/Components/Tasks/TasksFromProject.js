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

        const handleDelete = (id) => {
            axios.delete(`https://localhost:7153/api/ProjectTasks/${id}`)
            .then((response) => {
                //actualizar la lista de tareas eliminando la tarea con el id proporcionado
                setTasks(tasks.filter(task => task.id !== id));
        
                
            })
            .catch((error) => {
                console.error(`Error al eliminar el usuario con ID: ${id}`);
            });
            console.log(`Delete user with ID: ${id}`);
        };
    return <TaskList tasks={tasks} handleDelete={handleDelete}></TaskList>;
};

export default TasksFromProject;