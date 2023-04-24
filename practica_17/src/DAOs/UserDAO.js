import userModel from "../Model/user.js";

export default class UserDao {

    getUsers = (params) =>{
        return userModel.find(params).lean();
    }

    getUserBy = (params) =>{
        return userModel.findOne(params).lean();
    }

    createUser = (user) =>{
        return userModel.create(user);
    }
    DropUser=()=>{
        return userModel.collection.drop()
    }

}