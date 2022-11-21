let {Router}=require("express");
let router=new Router();


module.exports=app=>{
    const Contenedor=require("../Contenedor.js");
    const productos=new Contenedor("./productos.txt");
    app.use("/api/productos",router);
    router.get("/",async(req,res,next)=>{
        let products = await productos.getAll();
        res.json(products);
    })
    router.get("/:id", async (req,res,next)=> {
        const {id}=req.params;
        let producto = await productos.getById(Number(id));
        if(producto){
            res.json({product: producto})
        }
        else{res.json({error: "producto no encontrado"})}
    })
    router.post("/",async(req,res,next)=>{
        let obj=req.body;
        await productos.save(obj);
        let productActualziado=await productos.getAll();
        res.json({product: productActualziado});
    })

    router.put("/:id",async(req,res,next)=>{
        let {id}=req.params;
        let {title,price,thumbnail}=req.body;
        if(title && price &&thumbnail){
            let productEdit={id:Number(id),title: title,price:price,thumbnail:thumbnail}
            await productos.actualizar(productEdit);
            res.json({product: productEdit})
        }
        else{
            res.json({error: "datos a cambiar incorrectos"})
        }

    })
    router.delete("/:id",async(req,res,next)=>{
        let {id}=req.params;
        let productEliminado=await productos.getById(Number(id));
        await productos.deleteById(Number(id));
        res.json({deletProduct: productEliminado})
    })

}
