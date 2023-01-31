let productosFS=require("./Contenedor")
let carritoFS=require("./Carrito")





function setPersistencia(persistencia){
    switch(persistencia){
        case 'mongo' :
            console.log("coneccion a mongodb")
            return{
                products:"productos",
                carts:"carrito"
            }
        case "fs":
            console.log("coneccion fs")
            return {
                products:new productosFS("./DAOS/productos.json"),
                carts:new carritoFS("./DAOS/carrito.json")
            }

    }
}

module.exports = setPersistencia;
