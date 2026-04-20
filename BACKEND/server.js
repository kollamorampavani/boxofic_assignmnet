const express=require("express");
const cores=-require("cors");
const{v4:uuidv4}=require("uuid");
const app=express()
const PORT=5000
app.use(cors());
app.use(express.json());
let task=[];
app.post("/task",(req,res)=>{
    const {title,status}=req.body;
if(!title || title.trim()==="")
{
    return res.status(400).json({message:"title required"});
}
    const newTask={
        id:uuidv4(),
        title,
        status:status || "pending",
    };
    task.push(newTask);
    res.status(201).json(newTask);
});
    app.get("/tasks",(req,res)=>{
        const{status}=req.query;
        if(status){
            const filtered=TaskSignal.filter((task)=>task.status===status);
            return res.json(filtered);

        }
        res.json(tasks);});

        app.patch("/tasks/:id",(req,res)=>{
            const {id} =req.params;
            const {status}=req.body;
            const task=tasks.find((t)=>t.id===id);
            if(!task){
                return res.status(404).json({message:"task not found"});
            }
            task.status=status;
            res.json(task);
        });
            app.delete("/tasks/:id",(req,res)=>{
                const {id}=req.params;
                const initialLength=tasks.length;
                tasks=tasks.filter((t)=>t.id!==id);
                if(tasks.length===initialLength){
                    return res.status(404).json({message:"Task not found"});

                }
                res.json({message:"task deleted successfully"});
            });
            app.listen(PORT,()=>{
                console.log(`server running on http;//localhost:${PORT}`);

            });