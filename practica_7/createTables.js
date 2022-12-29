const knexLib=require("knex");
const config=require("./options/config.js")
let fs =require("fs");




const table=async()=>{
    try{
        const MariaDBClient=knexLib(config.mariaDB);
        const productosArr=JSON.parse(await fs.promises.readFile("./public/productos.txt"))
        await MariaDBClient.schema.dropTableIfExists("productos")
        await MariaDBClient.schema.createTable("productos", table => {
            table.increments("id").primary();
            table.string("title", 50).notNullable();
            table.float("price", 10).notNullable();
            table.string("thumbnail",100).notNullable();
    })
    await MariaDBClient('productos').insert(productosArr)
        .then(()=>console.log("tabla creada con exito")
        .then((error)=>console.log(error))
        .finally(()=>MariaDBClient.destroy()))
}catch(error){
    console.log("error con la tabla de mariadb");
    console.log(error);
}
}
exports.module=table;
