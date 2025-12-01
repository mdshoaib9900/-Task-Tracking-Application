const express=require("express");
const pool=require("./db");
require("dotenv").config();

const app=express();
app.use(express.json());


app.get("/tasks",async (req,res)=>{
    try{
        const result=await pool.query("SELECT * FROM tasks ORDER BY id ASC");
        res.json(result.rows);
    }catch(error){
        console.error("error fetching data ",error.message);
        res.status(500).json({error : error.message});
    }
})

module.exports = app;