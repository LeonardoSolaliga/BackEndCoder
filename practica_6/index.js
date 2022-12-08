const express = require('express');
const app = express()
const PORT = 8080;
const {Server: HttpServer} = require('http');
const {Server: IOServer} = require('socket.io');

const Contenedor=require("./api/Contenedor");
const productos=new Contenedor("./public/productos.txt");
const Mensajes=require("./api/mensajes")
const msg=new Mensajes("./public/chat.txt")

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
var handlebars = require("express-handlebars");
//view engine
app.engine('handlebars', handlebars.engine());
app.set("views", "./public/views");
app.set("view engine", "handlebars");
//Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())

httpServer.listen(PORT,()=>console.log("server abierto"))

//websocket
io.on("connection",async(socket)=>{
    socket.emit('UpdateProduct', await productos.getAll());
    socket.emit('UpdateMensaje', await msg.getAll());
    socket.on('newproduct', async product => {
        await productos.save(product)
        io.emit('UpdateProduct', await productos.getAll())
    })
    socket.on('newMensaje', async mensaje => {
        await msg.save(mensaje);
        io.emit('UpdateMensaje', await msg.getAll());
    })
})
app.get("/", (req, res)=>{
    res.render("index",{});
});


