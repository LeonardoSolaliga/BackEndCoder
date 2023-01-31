const mongoose=require("mongoose");
let ContainerMongo=require("./Mongodb.js");

const productsSchema = new mongoose.Schema({
    //_id:{type: Number, required: true},
    title: {type: String, required: true},
    price: {type: Number, required: true},
    thumbnail: {type: String, required: true},
    description: {type: String, required: true},
    codigo:{type: String, required: true},
    stock: {type: Number, required: true},
    timestamp:{type: String, required: true}
});

class ContenedorProductsMongo extends ContainerMongo {

    constructor() {
        super('products', productsSchema);
    };

    async save(product) {
        //const productos=await this.getAll();
        //product._id= productos?.length === 0 ? 1 : product._id = productos[productos?.length - 1]?._id + 1
        let today = new Date();
        let now = today.toLocaleString();
        product.timestamp=now;
        product.price=Number(product.price);
        product.stock=Number(product.stock);
        let newProd = await this.collection.create(product);
        return newProd;
    };
    async getAll(){
        try{
            let array=await this.coleccion.find({});
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


module.exports = ContenedorProductsMongo;
