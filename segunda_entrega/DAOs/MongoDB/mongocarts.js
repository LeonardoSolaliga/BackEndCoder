let mongoose=require("mongoose");
let ContainerMongo=require("./Mongodb.js");
const cartSchema = new mongoose.Schema({
    cartId:{type:Number, required:true, default:0},
    timestamp:{type:String,required:true},
    productos: [{type: Object, required: true}]
});

class ContenedorCartsMongo extends ContainerMongo {
    constructor() {
        super('carts', cartSchema);
    };

    async newCarrito() {
        let productos=[];
        // crea un nuevo objeto `Date`
        let today = new Date();
        // obtener la fecha y la hora
        let now = today.toLocaleString();
        let timestamp=now;
        let carritos=await this.getAll();
        let id;
        id=carritos.length===0 ? 1:carritos[carritos.length-1].id+1;
        let cart={cartId:id,timestamp:timestamp,productos:productos};
        let newCart = await this.collection.create(cart);
        return newCart;
    };
    async getById(id){
        let product=await this.collection.find({Productid:id})
        return product;

    }

    async agregarAlCarrito(carrritoId, product) {
        let cart= await this.collection.find({cartId:carrritoId})
        const {id,timestamp,productos}=cart[0];
        productos.push(product);
        console.log(productos);
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
        const cart= await this.collection.find({cartId:Number(cartid)})
        if(cart.length===0){
            return null;
        }
        const {id,timestamp,productos}=cart[0];
        return productos;
    }

};

module.exports = ContenedorCartsMongo;
