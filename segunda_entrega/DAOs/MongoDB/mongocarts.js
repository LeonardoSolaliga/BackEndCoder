let mongoose=require("mongoose");
let ContainerMongo=require("./Mongodb.js");
const cartSchema = new mongoose.Schema({
    cartId:{type:Number, required:true, default:0},
    timestamp:{type:String,required:true},
    products: [{type: Object, required: true}]
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

    async agregarAlCarrito(cartId, product) {
        let cart = [await this.collection.find({ cartId: cartId })];
        console.log(cart);
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

};

module.exports = ContenedorCartsMongo;
