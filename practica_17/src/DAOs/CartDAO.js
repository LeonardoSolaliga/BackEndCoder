import {cartModel} from "./MongoDB/mongocarts.js";


export default class CartsDAO {

    getCartById= (id,options={}) =>{
        if(options.populate)
            return cartModel.findOne({_id:id}).populate('products._id').lean()
        return cartModel.findOne({_id:id}).lean();
    }
    
    createCart = () =>{
        return cartModel.create({products:[]});
    }
    updateCart = (id, cart) => {
        return cartModel.findByIdAndUpdate(id, { $set: cart});
    };

}