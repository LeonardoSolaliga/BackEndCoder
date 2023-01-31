let productosFS=require("./filesystem/Contenedor")
let carritoFS=require("./filesystem/Carrito")





function setPersistencia(persistencia){
    switch(persistencia){
        case 'mongo' :
            console.log("coneccion a mongodb")
            return{
                products:"productos",
                carts:"carrito"
            }
        case "filesystem":
            return {
                products:new productosFS("./DAOS/filesystem/productos.json"),
                carts:new carritoFS("./DAOS/filesystem/carrito.json")
            }

    }
}

module.exports = setPersistencia;
