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

app.get('/productos',async(req,res,next) => {
    let allProducts = await productos.getAll()
    let productLength=allProducts?.length>0 ? true:false;
    let productLenghFalse=allProducts?.length>0 ? false:true;
    res.render("productos",{allProducts,productLength,productLenghFalse})
})

app.post("/productos",async(req,res,next)=>{
    let obj=req.body;
    await productos.save(obj);
    res.redirect("/productos")
})

app.listen(PORT);