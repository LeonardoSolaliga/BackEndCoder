const express = require('express');
const app = express()
const path=require("path");
const PORT = 8080;
const {Server: HttpServer} = require('http');
const {Server: IOServer} = require('socket.io');

const Contenedor=require("./api/Contenedor");
const productos=new Contenedor("./public/productos.txt");

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)


httpServer.listen(PORT,()=>console.log("server abierto"))

//websocket
io.on("connection",async(socket)=>{
    socket.emit('UpdateProduct', await productos.getAll());
    socket.on('newproduct', async product => {
        await productos.save(product)
        io.emit('UpdateProduct', await productos.getAll())
    })
})

//Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//view engine
app.set("views","./public/views");
app.set("view engine","ejs");

app.get("/", async(req, res)=>{
    res.render("index",{})
});










