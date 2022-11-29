const Contenedor=require("./Contenedor.js");
const productos=new Contenedor("./productos.txt");
let express=require("express");
let PORT=8080;
let app=express();

//middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json())


//view engine
app.set("views","./views/pug");
app.set("view engine","pug")


app.get("/", (req, res)=>{
    res.render("formulario.pug",{});
});

app.get('/productos',async(req,res,next) => {
    let allProducts = await productos.getAll()
    let productLength=allProducts?.length>0 ? true:false;
    res.render("productos.pug",{allProducts,productLength})
})

app.post("/productos",async(req,res,next)=>{
    let obj=req.body;
    await productos.save(obj);
    res.redirect("/productos")
})

app.listen(PORT);