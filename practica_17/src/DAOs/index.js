import productosFS from "./filesystem/Contenedor.js"
import carritoFS from "./filesystem/Carrito.js"
import ProductsDao from "./ProductsDAO.js"
import carritoMongo from "./CartDAO.js"
import userDAO from "./UserDAO.js"


function setPersistencia(persistencia){
    switch(persistencia){
        case 'mongo' :
            return{
                products:new ProductsDao,
                carts:new carritoMongo,
                userService:new userDAO
            }
        case "filesystem":
            return {
                products:new productosFS("./DAOS/filesystem/productos.json"),
                carts:new carritoFS("./DAOS/filesystem/carrito.json")
            }

    }
}


export default setPersistencia;
