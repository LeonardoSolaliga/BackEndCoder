import { Router } from "express";
import cartsController from "../controller/carts.controller.js"




let router = new Router();



/*router.get("/",cartsController.allCarts )
router.get("/CarritoEspecifico",cartsController.cartEspecifico)
router.get("/:id/productos", cartsController.idPorductCart)
router.post("/", cartsController.crearCart)*/
router.post("/finalizar", cartsController.finalizarCompra)
router.post("/:id/productos", cartsController.agregarAlCarrito)
//router.delete("/:id", cartsController.eliminarCarrito)
//router.delete("/:id/productos/:id_prod", cartsController.eliminarProductoDelCarrito)

export default router;