let {Router} = require("express");
let router = new Router();
const setPersistance=require("../../DAOs/index")
const container = setPersistance('mongo');
const APIproduct = container.products;
const APIcart=container.carts;


module.exports = app =>{
    app.use("/api/carrito",router);
    router.get("/",async(req,res,next)=>{
        let carrito = await APIcart.getAll();
        res.json(carrito);
    })
    router.get("/:id/productos",async(req,res,next)=>{
        const {id}=req.params;
        let cart=await APIcart.getAllProductos(Number(id));
        if(cart){
            if(cart==0){
                res.json(400);
                
            }
            else{
                res.json(cart);
            }
        }else{
            res.json(400);
        }
    })
    router.post("/",async(req,res,next)=>{
        let carrito=await APIcart.newCarrito();
        res.json({carrito:carrito});
    })
    router.post("/:id/productos",async(req,res,next)=>{
        const {id}=req.params;
        const cart=await APIcart.getById(Number(id));
        const bodyid=req.body;
        
        let productoAdd=await APIproduct.getById(Number(bodyid.id));

        if(cart && productoAdd){
            await APIcart.agregarAlCarrito(Number(id),productoAdd[0]);
            res.json({producto: productoAdd})
        }
        else{
            res.json(400);
        }
    })
    router.delete("/:id",async(req,res,next)=>{
        let {id}=req.params;
        let cartEliminado=await APIcart.getById(Number(id));
        await APIcart.deleteById(Number(id));
        if(cartEliminado){
            res.json({carrito: cartEliminado})
        }
        else{
            res.json({error: "error",description:"carrito a eliminar no encontrado"});
        }
    })

    router.delete("/:id/productos/:id_prod",async(req,res,next)=>{
        let {id}=req.params;
        let {id_prod}=req.params;
        const cart=await APIcart.getById(Number(id));
        let productoDelet=await APIproduct.getById(Number(id_prod));

        if(cart && productoDelet){
            await APIcart.eliminarProducto(Number(id),productoDelet[0]);
            res.json({producto: productoDelet})
        }
        else{
            res.json(400);
        }
    })

}