//let Contenedor = require('./contenedor.js');
//let conten=new Contenedor('./productos.txt');
const Contenedor=require("./Contenedor.js");
const productos=new Contenedor("./productos.txt");
let express=require("express");
let PORT=8080;
let app=express();
let hbs = require("express-handlebars");

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.engine('handlebars', hbs.engine());

app.set("views", "./views/hbs");
app.set("view engine", "handlebars");


app.get("/", (req, res)=>{
    res.render("formulario",{});
});




app.listen(PORT);