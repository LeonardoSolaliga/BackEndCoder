let fs =require("fs");

class Contenedor{
    constructor(ruta){
        this.ruta=ruta;
    }
    async getAll(){
        try{
            let contenido=await fs.promises.readFile(this.ruta,'utf-8');
            return JSON.parse(contenido);

        }
        catch(error){
            console.log("productos.txt vacio");
            return []
        }   

    }
    async getRandom(){
        try{
            let productos= await this.getAll()
            if(productos.length===0){
                return "productos.txt esta vacio"
            }
            else{
                return productos[Math.floor(Math.random() * productos.length)];
            }

        }catch(error){
            console.log(error);
        }
    }

}

//If you are using NodeJS v14.13.0 or newer (which does support ESM) you can enable it by setting "type":"module" in your project package.json
module.exports= Contenedor;