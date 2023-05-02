const typeDefs=`#graphql
    type Products{
        _id: ID
        title:String
        description:String
        price:Float
        code:String
    }
    type User{
        _id:ID
        fist_name:String
        last_name:String
        email:String
        password:String
    }
    type Query{
        helloWorld:String
        getProducts:[Products]
        getUsers:[User]
    }
    type Mutation{
        registerUser(first_name:String,last_name:String,password:String):User
    }
`
export default typeDefs;