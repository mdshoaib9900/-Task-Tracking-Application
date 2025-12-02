const express=require("express");
const {getTasks} =require("../controller/taskController");
const {getById,deleteById,addTask,updateById} =require("../controller/taskController");
const router=express.Router();

//to get tasks
router.get("/tasks",getTasks);
//to get task by id
router.get("/tasks/:id",getById);
//to delete task by id
router.delete("/tasks/:id",deleteById);
//to add task
router.post("/tasks",addTask);
//to update task by id
router.put("/tasks/:id",updateById);

module.exports=router;