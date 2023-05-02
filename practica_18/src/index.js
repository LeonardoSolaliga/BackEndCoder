import express from 'express';
import session from 'express-session';
import {Server as HttpServer} from 'http';
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
//import { addLogger } from "./middlewares/logger.js";
import {ApolloServer} from '@apollo/server'
import {expressMiddleware} from '@apollo/server/express4'
import typeDefs from './typeDefs.js';
import resolvers from './resolvers.js';

const app = express()
//const PORT = 8080;
const httpServer = new HttpServer(app)

mongoose.set('strictQuery', true);
try{
    mongoose.connect("mongodb+srv://CoderUserLeonardo:1234@codercluster38140.dbok9sm.mongodb.net/Practica17?retryWrites=true&w=majority",error=>{
        if(error) console.log(error)
        else console.log("base conectada")
})
}catch(error){
    console.log(error);
}
app.use(session({
    store: MongoStore.create({
        mongoUrl:"mongodb+srv://CoderUserLeonardo:1234@codercluster38140.dbok9sm.mongodb.net/Practica17?retryWrites=true&w=majority",
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
//app.use(addLogger);

const apollo=new ApolloServer({
    typeDefs,
    resolvers
})

await apollo.start()
app.use(expressMiddleware(apollo))

httpServer.listen(8080,()=>console.log("server abierto"))






app.use('/',viewsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/products',productsRouter)
app.use('/api/carrito',carritoRouter);


app.get('/pruebaLogger', (req, res) => {
    res.send("ok");
})