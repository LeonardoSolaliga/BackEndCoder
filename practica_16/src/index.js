import express from 'express';
import session from 'express-session';
import {Server as HttpServer} from 'http';
import {Server as IOServer} from 'socket.io';
import handlebars from "express-handlebars";
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import __dirname from './utils.js';
import viewsRouter from "./routes/views.router.js";
import sessionsRouter from './routes/sessions.router.js';
import productsRouter from "./routes/productos.js";
import carritoRouter from "./routes/carrito.js";
import passport from 'passport';
import initializeStrategies from './config/passport.config.js';
import { addLogger } from "./middlewares/logger.js";
import setPersistance from "./DAOs/index.js"
import config from "./config/config.js"
const container = setPersistance('mongo');
const APIproduct = container.products;

const app = express()
//const PORT = 8080;
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

mongoose.set('strictQuery', true);
try{
    mongoose.connect("mongodb+srv://CoderUserLeonardo:1234@codercluster38140.dbok9sm.mongodb.net/Practica16?retryWrites=true&w=majority",error=>{
        if(error) console.log(error)
        else console.log("base conectada")
})
}catch(error){
    console.log(error);
}
app.use(session({
    store: MongoStore.create({
        mongoUrl:"mongodb+srv://CoderUserLeonardo:1234@codercluster38140.dbok9sm.mongodb.net/Practica16?retryWrites=true&w=majority",
        ttl:60000
    }),
    secret: "aspdiasc903ok1pkc",
    resave: false,
    saveUninitialized: false
}));
//view engine
initializeStrategies();
app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars',handlebars.engine());
app.set('views', `${__dirname}/public/views`);
app.set('view engine','handlebars');

app.use(express.static(`${__dirname}/public`));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Logger
app.use(addLogger);


httpServer.listen(8080,()=>console.log("server abierto"))




//websocket
io.on("connection",async(socket)=>{
    socket.emit('UpdateProduct', await APIproduct.getAll());
    socket.on('newproduct', async product => {
        await APIproduct.save(product)
        io.emit('UpdateProduct', await APIproduct.getAll())
    })
})

app.use('/',viewsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/products',productsRouter)
app.use('/api/carrito',carritoRouter);


app.get('/pruebaLogger', (req, res) => {
    res.send("ok");
})