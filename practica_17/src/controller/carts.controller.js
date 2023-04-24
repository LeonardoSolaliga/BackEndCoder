import setPersistance from "../DAOs/index.js"
const container = setPersistance('mongo');
const APIcart = container.carts;


const agregarAlCarrito=async(req,res)=>{
    const user=req.session.user;
    const prdct=req.body;
    const cart=await APIcart.getCartById(user.cart)
    const exists=cart.products.some(prod=>prod._id===prdct._id)
    console.log(exists)
    if (exists){
        let newCart=cart.products.filter(elem=>elem._id!=prdct._id)
        //console.log(newCart)
        await APIcart.updateCart(cart._id,{products:newCart})

        cart.products.push(prdct)
        //console.log(cart.products)
        await APIcart.updateCart(cart._id,{products:cart.products})
        res.send({status: "success",message:"carrito agregado perro"})

    }else{
        console.log(prdct)
        cart.products.push(prdct)
        console.log(cart.products)
        console.log(cart)
        await APIcart.updateCart(cart._id,{products:cart.products});
        res.send({status: "success",message:"carrito agregado perro"})
    }
}


export default {
    agregarAlCarrito
}