import productosFS from "./filesystem/Contenedor.js"
import carritoFS from "./filesystem/Carrito.js"
import productoMongo from "./MongoDB/mongoproducts.js"
import carritoMongo from "./MongoDB/mongocarts.js"


function setPersistencia(persistencia){
    switch(persistencia){
        case 'mongo' :
            return{
                products:new productoMongo,
                carts:new carritoMongo
            }
        case "filesystem":
            return {
                products:new productosFS("./DAOS/filesystem/productos.json"),
                carts:new carritoFS("./DAOS/filesystem/carrito.json")
            }

    }
}

export default setPersistencia;
