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

//to add task
async function addTaskService(taskData) {
    const { title, description, assigneeId, status, dueDate } = taskData;
    return await pool.query(`INSERT INTO tasks (title, description, assigneeId, status, dueDate)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING * `,[title,description,assigneeId,status,dueDate]
);
}

//to update by id
async function updateByIdService(taskData,id) {
    const { title, description, assigneeId, status, dueDate } = taskData;
    return await pool.query(`UPDATE tasks
         SET title = $1,
         description = $2,
         assigneeId = $3,
         status = $4,
         dueDate = $5
         WHERE id = $6
         RETURNING * `,
         [title, description, assigneeId, status, dueDate, id]
        );
}
module.exports={
    getAllTasks,
    getTaskById,
    deleteTaskById,
    addTaskService,
    updateByIdService
}