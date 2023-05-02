import {cartsService} from '../DAOs/index.js'


const agregarAlCarrito=async(req,res)=>{
    const user=req.session.user;
    const prdct=req.body;
    const cart=await cartsService.getCartById(user.cart)
    const exists=cart.products.some(prod=>prod._id.toString()===prdct._id.toString())
    console.log(exists)
    if (exists){
        let newCart=cart.products.filter(elem=>elem._id.toString()!=prdct._id.toString())
        await cartsService.updateCart(cart._id,{products:newCart})
        let Carrito=await cartsService.getCartById(user.cart)
        Carrito.products.push(prdct)
        await cartsService.updateCart(cart._id,{products:Carrito.products})
        return res.send({status: "success",message:"carrito agregado perro"})

    }else{
        cart.products.push(prdct)
        await cartsService.updateCart(cart._id,{products:cart.products});
        return  res.send({status: "success",message:"carrito agregado perro"})
    }
    //res.send({status: "success",message:"carrito agregado perro"})
}
const finalizarCompra=async(req,res)=>{
    /*
    REALIZAR FINALIZAR COMPRA JUNTO MAILING
    */
}


export default {
    agregarAlCarrito,
    finalizarCompra
}