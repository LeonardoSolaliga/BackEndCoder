let {Router} = require("express");
let router = new Router();
let utils=require("../../utils")



module.exports = app =>{
    const Carrito=require("../../Carrito");
    const carritos=new Carrito(utils+"/carrito.json");
    const Contenedor=require("../../Contenedor");
    const productos=new Contenedor(utils+"/productos.json");
    app.use("/api/carrito",router);
    /*router.get("/id:/productos",async(req,res,next)=>{
        let products = await productos.getAll();
        res.json(products);
    })*/
    router.get("/:id/productos",async(req,res,next)=>{
        const {id}=req.params;
        let productos=await carritos.getAllProductos(Number(id));
        res.json(productos);

    })
    router.post("/",async(req,res,next)=>{
        let carrito=await carritos.newCarrito();
        res.json({carrito:carrito.id});
    })
    router.post("/:id/productos",async(req,res,next)=>{
        const {id}=req.params;
        const cart=await carritos.getById(Number(id));
        const bodyid=req.body;
        
        let productoAdd=await productos.getById(Number(bodyid.id));

        if(cart && productoAdd){
            await carritos.agregarAlCarrito(Number(id),productoAdd[0]);
            res.json({producto: productoAdd})
        }
        else{
            res.json(400);
        }
    })
    router.delete("/:id",async(req,res,next)=>{
        let {id}=req.params;
        let cartEliminado=await carritos.getById(Number(id));
        await carritos.deleteById(Number(id));
        if(cartEliminado){
            res.json({carrito: cartEliminado})
        }
        else{
            res.json({error: "error",description:"carrito a eliminar no encontrado"});
        }
    })

}