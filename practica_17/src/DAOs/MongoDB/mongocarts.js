
import mongoose from "mongoose";
//import ContainerMongo from "./Mongodb.js"
const cartSchema = new mongoose.Schema({

    products:[
        {
            _id: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "products",
            },
            quantity: {
                type: Number
            }
        },
    ],
},{
    timestamps:true
});
const cartModel  = mongoose.model('carts',cartSchema)
export default cartModel;

/*class ContenedorCartsMongo extends ContainerMongo {
    constructor() {
        super('carts', cartSchema);
    };

    async newCarrito(email) {
        let productos=[];
        // crea un nuevo objeto `Date`
        let today = new Date();
        // obtener la fecha y la hora
        let now = today.toLocaleString();
        let timestamp=now;
        let cart={cartId:email,timestamp:timestamp,productos:productos};
        let newCart = await this.collection.create(cart);
        return newCart;
    };
    async getById(id){
        let cart=await this.collection.find({cartId:id})
        return cart;
    }

    async agregarAlCarrito(carrritoId, product) {
        let cart= await this.collection.find({cartId:carrritoId})
        const {id,timestamp,productos}=cart[0];
        productos.push(product);
        await this.collection.updateOne({cartId:carrritoId},{$set:{productos:productos}})
    };
    async getAll(){
        try{
            let array=await this.collection.find({});
            if (array===0){
                return [];
            }
            return array;
        }catch(error){
            console.log(error);
            return [];
        }
    };
    async getAllProductos(cartid){
        const cart= await this.collection.find({cartId:cartid})
        if(cart.length===0){
            return null;
        }
        const {id,timestamp,productos}=cart[0];
        return productos;
    }
    async eliminarProducto(carid,producto){
        const cart= await this.getById(carid)
        if(cart===0){
            return null
        }
        const {id,timestamp,productos}=cart[0];
        let arr=productos;
        let prueba=arr.filter(elem=>elem.Productid!=producto.Productid)
        await this.collection.updateOne({cartId:carid},{$set:{productos:prueba}})
    }
    async deleteById(id){
        await this.collection.deleteOne({cartId:id});
    }

};
export default ContenedorCartsMongo;*/
