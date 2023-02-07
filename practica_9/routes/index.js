let {Router}=require("express");
let router=new Router();
let productsRouter = require("../Components/products");
let mensajesRouter = require("../Components/mensaje");




module.exports=app=>{
    productsRouter(app);
    mensajesRouter(app);
    router.get("/",async(req,res,next)=>{
        res.send("ok");
    })
}
