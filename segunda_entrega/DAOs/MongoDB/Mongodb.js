const mongoose=require("mongoose");
//import mongoose from "mongoose";


mongoose.set('strictQuery', true);
try{
    mongoose.connect("mongodb+srv://CoderUserLeonardo:1234@codercluster38140.dbok9sm.mongodb.net/SegundaEntregaFinal?retryWrites=true&w=majority",error=>{
        if(error) console.log(error)
        else console.log("base conectada")
})
}catch(error){
    console.log(error);
}


class ContainerMongo {
    constructor(collection, schema) {
        this.collection = mongoose.model(collection, schema)
    };

}
module.exports = ContainerMongo;