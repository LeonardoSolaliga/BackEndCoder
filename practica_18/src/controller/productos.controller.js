import {productsService} from '../DAOs/index.js'

const allProducts= async (req, res, next) => {
    const videogames = await productsService.getProducts();
    res.send({status:"success",payload:videogames})
}

const idProducts= async (req, res, next) => {
    /*const { id } = req.params;
    let products = await APIproduct.getById(Number(id));
    if (products) {
        res.json(products);
    }
    else {
        res.json({ error: "producto no encontrado" });
    }*/
    const page=req.query.page;
    const ProductosPagination=await productsService.getProducts({},page);
    const Productos=await ProductosPagination.docs;
    res.send(Productos);
}

const postProducts=async (req, res, next) => {
    const file = req.file;
    const  {title,description,code,price,category,stock} = req.body;
    if(!title||!description||!code||!price||!stock) return res.status(400).send({status:"error",error:"Incomplete values"});
    const product = {
        title,
        description,
        stock,
        code,
        price,
        category,
        image:`${req.protocol}://${req.hostname}:8080/img/${file.filename}`
    }
    const result = await productsService.createProducts(product)
    res.send({status:"success",payload:result})
}

const editProduct=async (req, res, next) => {
    let { id } = req.params;
    let { title, price, thumbnail, stock } = req.body;
    if (title && price && thumbnail) {
        let productEdit = { id: Number(id), title: title, price: Number(price), thumbnail: thumbnail, stock: Number(stock) }
        await productsService.actualizar(productEdit);
        res.json({ product: productEdit })
    }
    else {
        res.json({ error: "datos a cambiar incorrectos" })
    }

}

const deleteProduct=async (req, res, next) => {
    let { id } = req.params;
    let productEliminado = await productsService.getById(Number(id));
    await productsService.deleteById(Number(id));
    res.json({ deletProduct: productEliminado })
}

export default{
    allProducts,
    idProducts,
    postProducts,
    editProduct,
    deleteProduct
}