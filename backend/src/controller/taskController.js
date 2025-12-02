const { getAllTasks } = require("../service/taskService");
const {getTaskById,deleteTaskById,addTaskService,updateByIdService} = require("../service/taskService");

//get all task controller
async function getTasks(req,res) {
    try {
        const data=await getAllTasks();
        res.status(200).json(data);
        
    } catch (error) {
        console.error("Error fetching tasks:", error.message);
        res.status(500).json({ error: error.message });
    }
}

//get task by id 
async function getById(req,res) {
    const {id}=req.params;
    try {
        const data=await getTaskById(id);
        if(!data){
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching tasks by id:", error.message);
        res.status(500).json({ error: error.message });
    }
}

//delete task by id
async function deleteById(req,res) {
    const {id}=req.params;
    try {
       const deleted= await deleteTaskById(id);
        if (deleted.rowCount === 0) {
            return res.status(404).json({ message: "Task not found" });
        }
    res.status(200).json({ message: "Task deleted successfully" });
        
    } catch (error) {
        console.error("Error deleteing tasks by id:", error.message);
        res.status(500).json({ error: error.message });
    }
}

//add task
async function addTask(req,res) {
    try {
        const { title, description, assigneeId, status, dueDate } = req.body;
        const result = await addTaskService({
        title,
        description,
        assigneeId,
        status,
        dueDate,
        });
      res.status(201).json({
      message: "Task created successfully",
      task: result.rows[0],
    });
    } catch (error) {
        console.error("error adding task :", error.message);
        res.status(500).json({ error: error.message });
    }
}

//too update by id
async function updateById(req,res) {
    let {id}=req.params;
    id = Number(id);
    
    try { 
        const result=await updateByIdService(req.body,id);
        if(result.rowCount===0){
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(201).json({
        message: "Task updated successfully",
        task: result.rows[0]
    });

    } catch (error) {
        console.error("error updating task :", error.message);
        res.status(500).json({ error: error.message });
    }    
}

module.exports={
    getTasks,
    getById,
    deleteById,
    addTask,
    updateById
}