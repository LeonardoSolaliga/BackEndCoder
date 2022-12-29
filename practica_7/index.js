
let fs =require("fs");
const knexLib=require("knex");
const {sqlite3,mariaDB}=require("./options/config.js")
//const table=require("./createTables.js");

const express = require('express');
const app = express()
const PORT = 8080;
const {Server: HttpServer} = require('http');
const {Server: IOServer} = require('socket.io');
async function tablas(){
    try{
        const MariaDBClient=knexLib(mariaDB);
        const productosArr=JSON.parse(await fs.promises.readFile("./public/productos.txt"))
    
        await MariaDBClient.schema.dropTableIfExists("productos")
        await MariaDBClient.schema.createTable("productos", table => {
            table.increments("id").primary();
            table.string("title", 50).notNullable();
            table.float("price", 10).notNullable();
            table.string("thumbnail", 50).notNullable();
            })
        await MariaDBClient('productos').insert(productosArr)
            .then(()=>console.log("tabla creada"))
            .finally(()=>{
                MariaDBClient.destroy();
            })
        const sqlite3Client=knexLib(sqlite3)
        const msgArr=JSON.parse(await fs.promises.readFile("./public/chat.txt"))
        await sqlite3Client.schema.dropTableIfExists("mensajes")
        await sqlite3Client.schema.createTable("mensajes", table => {
            table.string("email", 50).notNullable();
            table.string("hora", 50).notNullable();
            table.string("mensaje", 50).notNullable();
            })
        await sqlite3Client('mensajes').insert(msgArr)
            .then(()=>console.log("tabla creada"))
            .finally(()=>{
                sqlite3Client.destroy();
            })
    }catch(error){
        console.log("error")
        console.log(error);
    }

}

tablas();
/*async()=>{
    try{
        const MariaDBClient=knexLib(config.mariaDB);
        const productosArr=JSON.parse(await fs.promises.readFile("./public/productos.txt"))
        await MariaDBClient.schema.dropTableIfExists("productos")
        await MariaDBClient.schema.createTable("productos", table => {
            table.increments("id").primary();
            table.string("title", 50).notNullable();
            table.float("price", 10).notNullable();
            table.string("thumbnail",100).notNullable();
    })
    await MariaDBClient('productos').insert(productosArr)
        .then(()=>console.log("tabla creada con exito")
        .then((error)=>console.log(error))
        .finally(()=>MariaDBClient.destroy()))
}catch(error){
    console.log("error con la tabla de mariadb");
    console.log(error);
}
}*/
//table;
const ContenedorSQL=require("./api/ContenedorSQL.js");
const products=new ContenedorSQL(mariaDB,"productos","./public/productos.txt");
const Mensajes=require("./api/ContenedorSQL.js")
const msg=new Mensajes(sqlite3,"mensajes","./public/chat.txt")

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

/*async function prueba(){
    const probar=await products.getAll();
    console.log(probar)
}
prueba();
*/
io.on("connection",async(socket)=>{
    socket.emit('UpdateProduct', await products.getAll());
    socket.emit('UpdateMensaje', await msg.getAll());
    socket.on('newproduct', async product => {
        await products.save(product)
        io.emit('UpdateProduct', await products.getAll())
    })
    socket.on('newMensaje', async mensaje => {
        await msg.saveMensaje(mensaje);
        io.emit('UpdateMensaje', await msg.getAll());
    })
})
app.get("/", (req, res)=>{
    res.render("index",{});
});
