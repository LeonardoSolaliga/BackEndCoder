import setPersistance from "../DAOs/index.js"
const container = setPersistance('mongo');
const APIcart = container.carts;


const agregarAlCarrito=async(req,res)=>{
    const user=req.session.user;
    const prdct=req.body;
    console.log(prdct);
    const cart=await APIcart.getCartById(user.cart)
    /*const exists=cart.productos.find(prod=>prod.code===prdct.code)
    if (exists){
    }*/
    cart.products.push(prdct)
    console.log(cart)
    await APIcart.updateCart(cart._id,{products:cart.products});
    res.send({status: "success",message:"carrito agregado perro"})
}


export default {
    agregarAlCarrito
}