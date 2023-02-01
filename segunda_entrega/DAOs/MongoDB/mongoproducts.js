const mongoose=require("mongoose");
let ContainerMongo=require("./Mongodb.js");

const productsSchema = new mongoose.Schema({
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
        const productos=await this.getAll();
        product.productid= productos.length === 0 ? 1 : product.productid = productos[productos.length - 1].productid + 1
        let today = new Date();
        let now = today.toLocaleString();
        product.timestamp=now;
        product.price=Number(product.price);
        product.stock=Number(product.stock);
        await this.collection.create(product);
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


module.exports = ContenedorProductsMongo;