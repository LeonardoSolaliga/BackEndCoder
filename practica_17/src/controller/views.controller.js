import setPersistance from "../DAOs/index.js"
const container = setPersistance('mongo');
const APIproducts = container.products;
const APIcart=container.carts

const register=(req,res)=>{
    res.render('register',{});
}

const login=(req,res)=>{
    req.logger.warning('warning')
    res.render('login',{});
}

const logout=(req,res)=>{
    try{
    req.session.destroy();
    res.redirect('/')
    }catch(err){
        res.send(err);
    }
}

const profile=(req,res)=>{
    res.render('profile',{user:req.session.user})
}

const inicio=async(req, res)=>{
    const page=req.query.page|| 1;
    const ProductosPagination=await APIproducts.getProducts({},page);
    const Productos=ProductosPagination.docs;
    //console.log(Productos)
    const paginationData={
        hasPrevPage:ProductosPagination.hasPrevPage,
        hasNextPage:ProductosPagination.hasNextPage,
        nextPage:ProductosPagination.nextPage,
        prevPage:ProductosPagination.prevPage,
        page:ProductosPagination.page
    }
    res.render("inicio",{user:req.session.user,Productos,paginationData});
}
const crearProducto=(req,res)=>{
    res.render('productos');
}

const cart=async(req,res)=>{
    const cartId=req.session.user.cart
    const cart=await APIcart.getCartById(cartId,{populate:true})
    const name=req.session.user.nombre
    console.log(cart.products)
    //const Productos  = cart.products.map(prod=>prod._id);
    //console.log(Productos)
    res.render('carts',{Productos:cart.products,name})
}

export default{
    register,
    login,
    logout,
    profile,
    inicio,
    crearProducto,
    cart

}