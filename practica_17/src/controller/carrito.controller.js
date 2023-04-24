import setPersistance from "../DAOs/index.js"
import Mailer from "../services/nodemailer.js"
const container = setPersistance('mongo');
const APIproduct = container.products;
const APIcart = container.carts;

const allCarts=async (req, res, next) => {
    let carrito = await APIcart.getAll();
    res.json(carrito);
}

const cartEspecifico= async (req, res, next) => {
    let cart=await APIcart.getById(req.session.user.email);
    res.send(cart)
}

const idPorductCart=async (req, res, next) => {
    const { id } = req.params;
    let cart = await APIcart.getAllProductos(Number(id));
    if (cart) {
        if (cart == 0) {
            res.json(400);

        }
        else {
            res.json(cart);
        }
    } else {
        res.json(400);
    }
}

const crearCart=async (req, res, next) => {
    const {first_name,last_name,email,password} = req.body;
    await APIcart.newCarrito(email);
    res.send({status: "success",message:"carrito creado",});
}
const finalizarCompra=async (req, res, next) => {
    let cart=await APIcart.getById(req.session.user.email)
    let contenedor = ``;
    let calculadora=0;
    for (const producto of (cart[0].productos)) {
        const prod = await APIproduct.getById(producto.Productid)
        
        if (prod) {
            calculadora+=((prod[0].price)*producto.cantidad)
            contenedor += `<span>Titulo:${prod[0].title}</span> <span>Price: $${prod[0].price}</span> <span>Cantidad:${producto.cantidad}</span> <span>Imagen: ${prod[0].thumbnail}</span></p>`
        }

        
    }
    contenedor+=`<span>PRECIO TOTAL:${calculadora}</span>`
    await Mailer.sendMail({
        from:'Compra completada <leo.nosecuanto@gmail.com>',
        to:req.session.user.email,
        subject:'Correo de prueba :)',
        html:`${contenedor}`,
    })
    res.send({status: "success", message: "Compra finalizada"})
}
const agregarAlCarrito=async (req, res, next) => {
    const cart = await APIcart.getById(req.session.user.email);
    const bodyid = req.body;
    const productoElegido=bodyid.product.code
    let productoAdd = await APIproduct.getProducts({productoElegido});

    if (cart && productoAdd) {
        await APIcart.agregarAlCarrito(req.session.user.email, bodyid.product);
        res.json({ producto: bodyid.product })
    }
    else {
        res.json(400);
    }
}
const eliminarCarrito=async (req, res, next) => {
    let { id } = req.params;
    let cartEliminado = await APIcart.getById(Number(id));
    await APIcart.deleteById(Number(id));
    if (cartEliminado) {
        res.json({ carrito: cartEliminado })
    }
    else {
        res.json({ error: "error", description: "carrito a eliminar no encontrado" });
    }
}
const eliminarProductoDelCarrito=async (req, res, next) => {
    let {id} = req.params;
    let {id_prod} = req.params;
    const cart = await APIcart.getById(id);
    let productoDelet = await APIproduct.getById(Number(id_prod));

    if (cart && productoDelet) {
        await APIcart.eliminarProducto(id, productoDelet[0]);
        res.json({ producto: productoDelet })
    }
    else {
        res.json(400);
    }
}

export default{
    allCarts,
    cartEspecifico,
    idPorductCart,
    crearCart,
    finalizarCompra,
    agregarAlCarrito,
    eliminarCarrito,
    eliminarProductoDelCarrito

}