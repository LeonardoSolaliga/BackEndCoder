const knexLib=require("knex");
const {sqlite3,mariaDB}=require("./options/config.js")
let fs =require("fs");

async function tablas(){
    try{
        const MariaDBClient=knexLib(mariaDB);
        const productosArr=JSON.parse(await fs.promises.readFile("./public/productos.txt"))
    
        await MariaDBClient.schema.dropTableIfExists("productos")
        await MariaDBClient.schema.createTable("productos", table => {
            table.increments("id").primary();
            table.string("title", 50).notNullable();
            table.float("price", 10).notNullable();
            table.string("thumbnail", 50).notNullable();
            })
        await MariaDBClient('productos').insert(productosArr)
            .then(()=>console.log("tabla creada"))
            .finally(()=>{
                MariaDBClient.destroy();
            })
        const sqlite3Client=knexLib(sqlite3)
        const msgArr=JSON.parse(await fs.promises.readFile("./public/chat.txt"))
        await sqlite3Client.schema.dropTableIfExists("mensajes")
        await sqlite3Client.schema.createTable("mensajes", table => {
            table.string("email", 50).notNullable();
            table.string("hora", 50).notNullable();
            table.string("mensaje", 50).notNullable();
            })
        await sqlite3Client('mensajes').insert(msgArr)
            .then(()=>console.log("tabla creada"))
            .finally(()=>{
                sqlite3Client.destroy();
            })
    }catch(error){
        console.log("error")
        console.log(error);
    }

}

tablas();
