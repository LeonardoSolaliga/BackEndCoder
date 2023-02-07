let {Router} = require("express");
let router = new Router();
let contenedor=require("../../Container/ProductosFaker.js")

module.exports = app =>{
    app.use("/api/productos-test",router);
    router.get("/",async(req,res,next)=>{
        let productos = [];

        for (let i = 0; i < 8; i++) {
            productos.push(contenedor)
        }
        res.json(productos);
    })
}