//import express from "express";
//import serverRoutes from "./routes";

const express = require('express');
const serverRoutes=require("./routes");
const app = express()
const PORT=process.env.PORT || 8080;



app.use(express.urlencoded({extended:true}))
app.use(express.json())


serverRoutes(app);






app.listen(PORT,console.log("server on"));





