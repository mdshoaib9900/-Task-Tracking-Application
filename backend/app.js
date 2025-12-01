const express=require("express");
const pool=require("./db");
require("dotenv").config();

const app=express();
app.use(express.json());



module.exports = app;