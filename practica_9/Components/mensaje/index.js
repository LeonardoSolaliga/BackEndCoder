let {Router} = require("express");
let router = new Router();
//let mensajes=require('../../index.js')
let {normalize,schema}=require("normalizr");
module.exports = app =>{
    app.use("/api/mensajes",router);
    router.get("/",async(req,res,next)=>{
        const chats = {
            id: 1,
            title: "Chats canal 1",
            author: {
                id: 1,
                name: "Leonardo"
            },
            comments: [
                { 
                    id: 1,
                    author: {
                        id: 2, 
                        name: 'Agustin', 
                    },
                    message: "Hola a todos que tal?"
                
                },
                { 
                    id: 2,
                    author: {
                        id: 3, 
                        name: 'Maria'
                    },
                    message: "hola que tal a todos"
                },
                { 
                    id: 3,
                    author: {
                        id: 2, 
                        name: 'Agustin'
                    },
                    message: "muy bien y austedes probando el chat"
                },
                { 
                    id: 4,
                    author: {
                        id: 1, 
                        name: 'Leonardo'
                    },
                    message: "Creo que todos igual,probando el chat jaja"
                },
                { 
                    id: 5,
                    author: {
                        id: 2, 
                        name: 'Agustin'
                    },
                    message: "looool verdad jajajaja"
                },
                { 
                    id: 6,
                    author: {
                        id: 3, 
                        name: 'Maria'
                    },
                    message: "normalizando este chat probando"
                }
            ]
        };
        const user = new schema.Entity('users');
        const mensajes = new schema.Entity('mensajes',{
            author: user
        })
        const chatCanal = new schema.Entity('posts',{
            author: user,
            comments: [mensajes]
        })

        const normalizedData = normalize(chats, chatCanal)
        //console.log(JSON.stringify(normalizedData,null,'\t'))
        //console.log(`Longitud original: ${JSON.stringify(chats).length}`);
        //console.log(`Longitud normalizada: ${JSON.stringify(normalizedData).length}`)
        res.json(normalizedData);
    })
}