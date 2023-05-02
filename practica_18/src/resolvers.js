import {productsService,usersService} from "./DAOs/index.js"

const resolvers={
    Query:{
        helloWorld:()=>{
            return "hola mundo";
        },
        getProducts:async()=>{
            const productos=await productsService.getProducts();
            console.log(productos);
            return productos.docs;
        },
        getUsers:async()=>{
            const users=usersService.getUsers();
            return users
        }
    },
    Mutation:{
        registerUser:async(_,args)=>{
            const user={
                first_name:args.first_name,
                last_name:args.last_name,
                email:args.email,
                password:args.password
            }
            const result=await usersService.createUser(user)
            return result
        }
    }
}

export default resolvers;