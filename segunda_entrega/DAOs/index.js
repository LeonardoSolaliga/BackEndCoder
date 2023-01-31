let productosFS=require("./filesystem/Contenedor")
let carritoFS=require("./filesystem/Carrito")

let productoMongo=require("./MongoDB/mongoproducts.js");
//let carritoMongo=require("./MongoDB/mongocarts.js");





function setPersistencia(persistencia){
    switch(persistencia){
        case 'mongo' :
            return{
                products:new productoMongo
                //carts:new carritoMongo
            }
        case "filesystem":
            return {
                products:new productosFS("./DAOS/filesystem/productos.json"),
                carts:new carritoFS("./DAOS/filesystem/carrito.json")
            }

    }
}

module.exports = setPersistencia;
