import {productsModel} from "./MongoDB/mongoproducts.js";


export default class ProductsDAO {

    getProducts= (params,page=1) =>{
        return productsModel.paginate(params,{page,limit:2,lean:true});
    }
    
    createProducts = (params) =>{
        return productsModel.create(params);
    }

}