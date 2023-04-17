import { Router } from "express";
import productsController from "../controller/productos.controller.js"


let router = new Router();

// estas funciones debo cambiarlas
const esAdmin = true;

function soloAdmins(req, res, next) {
    if (!esAdmin) {
        res.json(crearErrorNoEsAdmin())
    } else {
        next()
    }
}

function crearErrorNoEsAdmin() {
    const error = { error: -2 }
    error.description = "no autorizado";
    return error
}

router.get("/",productsController.allProducts)
router.get("/:id",productsController.idProducts)

router.post("/", soloAdmins, productsController.postProducts)
router.put("/:id", soloAdmins, productsController.editProduct)
router.delete("/:id", soloAdmins, productsController.deleteProduct)

export default router;