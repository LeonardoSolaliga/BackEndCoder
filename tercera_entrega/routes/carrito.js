import { Router } from "express";
import setPersistance from "../DAOs/index.js"
import nodemailer from 'nodemailer'

let router = new Router();
const container = setPersistance('mongo');
const APIproduct = container.products;
const APIcart = container.carts;

const GMAIL_PWD = 'ishujxivijablmcl';
const GMAIL_USER = "leo.nosecuanto@gmail.com";

const transporter = nodemailer.createTransport({
    service:'gmail',
    port: 587,
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_PWD
    }
});


router.get("/", async (req, res, next) => {
    let carrito = await APIcart.getAll();
    res.json(carrito);
})
router.get("/CarritoEspecifico", async (req, res, next) => {
    let cart=await APIcart.getById(req.session.user.email);
    res.send(cart)
})
router.get("/:id/productos", async (req, res, next) => {
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
})
router.post("/", async (req, res, next) => {
    const {first_name,last_name,email,password} = req.body;
    console.log(email)
    await APIcart.newCarrito(email);
    res.send({status: "success",message:"carrito creado",});
})
router.post("/finalizar", async (req, res, next) => {
    let cart=await APIcart.getById(req.session.user.email)
    let contenedor = ``;
    let calculadora=0;
    //console.log(cart[0].productos)
    for (const producto of (cart[0].productos)) {
        const prod = await APIproduct.getById(producto.Productid)
        
        if (prod) {
            calculadora+=((prod[0].price)*producto.cantidad)
            contenedor += `<span>Titulo:${prod[0].title}</span> <span>Price: $${prod[0].price}</span> <span>Cantidad:${producto.cantidad}</span> <span>Imagen: ${prod[0].thumbnail}</span></p>`
        }

        
    }
    contenedor+=`<span>PRECIO TOTAL:${calculadora}</span>`
    await transporter.sendMail({
        from:'Compra completada <leo.nosecuanto@gmail.com>',
        to:req.session.user.email,
        subject:'Correo de prueba :)',
        html:`${contenedor}`,
    })
    res.send({status: "success", message: "Compra finalizada"})
})
router.post("/:id/productos", async (req, res, next) => {
    //const { id } = req.params;
    const cart = await APIcart.getById(req.session.user.email);
    const bodyid = req.body;

    let productoAdd = await APIproduct.getById(Number(bodyid.product.Productid));

    if (cart && productoAdd) {
        await APIcart.agregarAlCarrito(req.session.user.email, bodyid.product);
        res.json({ producto: bodyid.product })
    }
    else {
        res.json(400);
    }
})
router.delete("/:id", async (req, res, next) => {
    let { id } = req.params;
    let cartEliminado = await APIcart.getById(Number(id));
    await APIcart.deleteById(Number(id));
    if (cartEliminado) {
        res.json({ carrito: cartEliminado })
    }
    else {
        res.json({ error: "error", description: "carrito a eliminar no encontrado" });
    }
})

router.delete("/:id/productos/:id_prod", async (req, res, next) => {
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
})

export default router;