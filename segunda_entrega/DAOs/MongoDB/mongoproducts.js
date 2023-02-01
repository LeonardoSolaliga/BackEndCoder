const mongoose=require("mongoose");
let ContainerMongo=require("./Mongodb.js");

const productsSchema = new mongoose.Schema({
    Productid:{type:Number,required:true,default:0},
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


    async save(objeto) {
        
        const productos=await this.getAll();
        objeto.Productid = productos.length === 0 ? 1 : objeto.Productid = productos[productos.length - 1].Productid + 1

        let today = new Date();
        let now = today.toLocaleString();
        objeto.timestamp=now;
        objeto.price=Number(objeto.price);
        objeto.stock=Number(objeto.stock);
        console.log(objeto.Productid);
        await this.collection.create(objeto);
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
    async getById(id){
        let product=await this.collection.find({Productid:id})
        return product;

    }
    async deleteById(id){
        await this.collection.deleteOne({Productid:id});
    }
    async actualizar(producto){
        let {id,title,price,thumbnail,stock}=producto;
        await this.collection.updateOne({Productid:id},{$set:{title: title,price:price,thumbnail:thumbnail,stock:stock}})

    }

};


module.exports = ContenedorProductsMongo;