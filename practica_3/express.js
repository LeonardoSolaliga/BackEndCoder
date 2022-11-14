let Contenedor = require('./contenedor.js');

let conten=new Contenedor('./productos.txt');
let express=require("express");
let PORT=3001;
let app=express();


app.get('/productos',async(request,response,next) => {
    const allProducts = await conten.getAll()
    response.send(allProducts)
})
app.get('/productoRandom',async(request,response,next) => {
    let producto=await conten.getRandom()
    response.send(producto);
})


app.listen(PORT);