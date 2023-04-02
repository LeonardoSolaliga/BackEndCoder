import { Router } from "express";
import setPersistance from "../DAOs/index.js"
let router = new Router();
const container = setPersistance('mongo');
const APIproduct = container.products;
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

router.get("/", async (req, res, next) => {
    let products = await APIproduct.getAll();
    res.send(products);
})
router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    let products = await APIproduct.getById(Number(id));
    if (products) {
        res.json(products);
    }
    else {
        res.json({ error: "producto no encontrado" });
    }
})

router.post("/", soloAdmins, async (req, res, next) => {
    let obj = req.body;
    await APIproduct.save(obj);
    let productActualizado = await APIproduct.getAll();
    res.json({ product: productActualizado });
})
router.put("/:id", soloAdmins, async (req, res, next) => {
    let { id } = req.params;
    let { title, price, thumbnail, stock } = req.body;
    if (title && price && thumbnail) {
        let productEdit = { id: Number(id), title: title, price: Number(price), thumbnail: thumbnail, stock: Number(stock) }
        await APIproduct.actualizar(productEdit);
        res.json({ product: productEdit })
    }
    else {
        res.json({ error: "datos a cambiar incorrectos" })
    }

})
router.delete("/:id", soloAdmins, async (req, res, next) => {
    let { id } = req.params;
    let productEliminado = await APIproduct.getById(Number(id));
    await APIproduct.deleteById(Number(id));
    res.json({ deletProduct: productEliminado })
})

export default router;