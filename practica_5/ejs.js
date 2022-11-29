const Contenedor=require("./Contenedor.js");
const productos=new Contenedor("./productos.txt");
let express=require("express");
let PORT=8080;
let app=express();

//middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json())


//view engine
app.set("views","./views/ejs");
app.set("view engine","ejs")

app.listen(PORT);