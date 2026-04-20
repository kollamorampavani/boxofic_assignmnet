import { useState, useEffect, useCallback }
from "react";
import axios from "axios";
const API="http://localhost:5000/tasks";
function App(){
    const[tasks,setTasks]=useState([]);
    const[title,setTitle]=useState("");
    const [status,setStatus]=useState("pending");
    const [filter,setFilter]=useState("all");
    const fetchTasks = useCallback(async () => {
        let url=API;
        if(filter!=="all"){
            url+=`?status=${filter}`;
        }
        const res=await axios.get(url);
        setTasks(res.data);
      }, [filter]);
    useEffect(()=>{
      fetchTasks();
    },[fetchTasks]);
    const addTask=async()=>{
        if(!title.trim()) return alert("Title required");
        await axios.post(API,{
            title,
            status,
        });
        setTitle("");
        setStatus("pending");
        fetchTasks();
      };
        const toggleStatus = async (task) => {
            const newStatus = task.status === "pending" ? "completed" : "pending";
            await axios.patch(`${API}/${task.id}`, {
                status: newStatus,
            });
            fetchTasks();
        };
        const deleteTask=async(id)=>{
            await axios.delete(`${API}/${id}`);
            fetchTasks();
        };
        return(
            <div style={{padding:"20px"}}>
                <h2>Task Manager</h2>
                <div>
                    <input
                    value={title}
                    placeholder="enter task"
                    onChange={(e)=>setTitle(e.target.value)}
                    />
                    <select value={status} onChange={(e)=>setStatus(e.target.value)}>
                        <option value="pending">Pending</option>
                        <option value="completed">completed</option>
                    </select>
                    <button onClick={addTask}>Add Task</button>
                </div>
                <div style={{marginTop:"10px"}}>
                    <button onClick={()=>setFilter("all")}>All</button>
                    <button onClick={()=>setFilter("pending")}>Pending</button>
                    <button onClick={()=>setFilter("completed")}>Completed</button>
                </div>
                <ul>
                    {tasks.map((task)=>(
                        <li key={task.id}>
                            <b>{task.title}</b>-{task.status}
                            <button onClick={()=>toggleStatus(task)}>ToggleStatus</button>
                            <button onClick={()=>deleteTask(task.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
        }

export default App;