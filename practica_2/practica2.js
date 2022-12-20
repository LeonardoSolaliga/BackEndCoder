let fs =require("fs");

class Contenedor{
    constructor(ruta){
        this.ruta=ruta;
    }
    async saveProduct(object){
        const products = await this.getAll()
        object.id = parseInt(object.id) 
        object.id = this.checkId(object, products)
        object.price = parseInt(object.price)
        try {
            console.log(`El siguiente elemento sera guardado : \n${JSON.stringify(object)}`)
            products.push(object)
            await fs.writeFile(this.route, JSON.stringify(products, null, 2))
            console.log('Guardado exitoso')
            return object
        } catch (error) {
            console.error('Error de escritura')
            console.error(error)
        }
    }
    async getById(id){
        const productos=await this.getAll();
        if(productos.length!=null){
            let producto=productos.filter(elem=>elem.id===id)
            return producto ? producto:null;
        }
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
    async deleteById(id){
        const productos=await this.getAll();
        let arrproductos=[];
        if(productos.length!=null){
            arrproductos=productos.filter(elem=>elem.id!=id)
            
        }
        try{
            await fs.promises.writeFile(this.ruta, JSON.stringify(arrproductos, null, 2))
        }catch(error){
            console.log(error);
            console.log("error en eliminar")
        }
    }
    async deleteAll(){

        try{
            await fs.promises.writeFile(this.ruta, "");
            console.log("se ha eliminado el txt");

        }catch(error){

            console.log(error);

        }

    }

}
//crear funcion asyncrona, sino devuelve Promise { <pending> } 
//porque termina antes de devolver la promesa
async function inicio(){
    let conten=new Contenedor('./productos.txt');
    let allProducts=await conten.getAll();
    console.log(allProducts);
    let producto1 = {"title":"The mount", "price": 4520, "thumbnail":"image3.png"};
    await conten.save(producto1);


    //let productoID=await conten.getById(2);
    //console.log(productoID);
    //await conten.deleteById(1);
    //await conten.deleteAll();
    
}
inicio();
