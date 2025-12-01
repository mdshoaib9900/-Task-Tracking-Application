const pool=require("../../db");

//to get all tasks from db
async function getAllTasks() {
    try {
        const result=await pool.query("SELECT * FROM tasks ORDER BY id ASC");
        return result.rows;
        
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

//to get task by id from db
async function getTaskById(ids) {
    try {
        const tasks =await pool.query("SELECT * FROM tasks WHERE id=$1",[ids]);
        return tasks.rows[0];
    } catch (error) {
        console.error(error.message);
        throw error;
    }    
}

//to delete task by id
async function deleteTaskById(ids) {

    return await pool.query("DELETE FROM tasks WHERE id=$1",[ids]);
           
}
module.exports={
    getAllTasks,
    getTaskById,
    deleteTaskById
}