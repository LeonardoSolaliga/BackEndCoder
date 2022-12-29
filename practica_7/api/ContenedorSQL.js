const knexLib=require("knex");
let fs =require("fs");

class ContenedorSQL{
    constructor(config,tabla,ruta){
        this.knex=knexLib(config);
        this.tabla=tabla;
        this.ruta=ruta;
    }
    async save(objeto){

        const products=await this.knex(this.tabla).select("*");
        objeto.id = products.length === 0 ? 1 : objeto.id = products[products.length - 1].id + 1//ingreso al ultimo item del array y le sumo 1 a su id al nuevo objeto, para que nunca se repita
        
        try{
            await this.knex(this.tabla).insert(objeto)
                .finally(async()=>{
                    products.push(objeto)
                    await fs.promises.writeFile(this.ruta, JSON.stringify(products, null, 2))
                    this.disconnect();})
            
            console.log("se ha guardado");

        }catch(error){
            console.log("lalalalala")
            console.log(error);

        }
    }
    async getAll(){
        try{
            await this.knex(this.tabla).select("*")
            this.disconnect();
            
        }
        catch(error){
            console.log("hubo un error");
            console.log(error);
            return []
        }
    }
    async getByID(id){
        try{
            const producto=await this.knex(this.tabla).select('*').where('id', id)
            this.disconnect();
            return producto;
        }catch(error){
            console.log(error);
        }
    }
    async disconnect() {
        try {
            await this.knex.destroy()
        } catch (error) {
            console.log(error)
        }
    }
    async saveMensaje(mensaje){
        const msg=await this.knex(this.tabla).select("*");
        try {
            await this.knex(this.table).insert(msg)
                .finally(async () => {
                    msg.push(mensaje)
                    await fs.writeFile(this.route, JSON.stringify(msg, null, 2));
                    this.disconnect();
                })
        } catch (error) {
            console.error('Error de escritura')
            console.error(error)
        }
    }

}
module.exports = ContenedorSQL;