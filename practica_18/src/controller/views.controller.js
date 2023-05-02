import {cartsService, productsService} from '../DAOs/index.js'

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
    const ProductosPagination=await productsService.getProducts({},page);
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
    const cartid=req.session.user.cart
    const cart=await cartsService.getCartById(cartid,{populate:true})
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