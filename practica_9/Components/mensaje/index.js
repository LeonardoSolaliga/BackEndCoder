let {Router} = require("express");
let router = new Router();

module.exports = app =>{
    app.use("/api/mensajes",router);
    router.get("/",async(req,res,next)=>{
        let productos = [];

        for (let i = 0; i < 8; i++) {
            productos.push(generateProduct())
        }
        res.json(productos);
    })
}