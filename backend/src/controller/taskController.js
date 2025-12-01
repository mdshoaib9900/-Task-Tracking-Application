const { getAllTasks } = require("../service/taskService");
const {getTaskById,deleteTaskById} = require("../service/taskService");

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

module.exports={
    getTasks,
    getById,
    deleteById
}