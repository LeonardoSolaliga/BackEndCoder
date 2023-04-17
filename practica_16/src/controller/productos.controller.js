import setPersistance from "../DAOs/index.js"
const container = setPersistance('mongo');
const APIproduct = container.products;

const allProducts= async (req, res, next) => {
    let products = await APIproduct.getAll();
    res.send(products);
}

const idProducts= async (req, res, next) => {
    const { id } = req.params;
    let products = await APIproduct.getById(Number(id));
    if (products) {
        res.json(products);
    }
    else {
        res.json({ error: "producto no encontrado" });
    }
}

const postProducts=async (req, res, next) => {
    let obj = req.body;
    await APIproduct.save(obj);
    let productActualizado = await APIproduct.getAll();
    res.json({ product: productActualizado });
}

const editProduct=async (req, res, next) => {
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

}

const deleteProduct=async (req, res, next) => {
    let { id } = req.params;
    let productEliminado = await APIproduct.getById(Number(id));
    await APIproduct.deleteById(Number(id));
    res.json({ deletProduct: productEliminado })
}

export default{
    allProducts,
    idProducts,
    postProducts,
    editProduct,
    deleteProduct
}