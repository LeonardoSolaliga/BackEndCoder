
import fs from 'fs';

class Carrito{
    constructor(ruta){
        this.ruta=ruta;
    }
    async newCarrito(){
        let productos=[];
        // crea un nuevo objeto `Date`
        let today = new Date();
        // obtener la fecha y la hora
        let now = today.toLocaleString();
        let timestamp=now;
        let carritos=await this.getAll();
        let id;
        id=carritos.length===0 ? 1:carritos[carritos.length-1].id+1;

        let cart={id:id,timestamp:timestamp,productos:productos};
        await this.saveCarrito(cart);
        return cart;

    }
    async getAll(){
        try {
            let array = await fs.promises.readFile(this.ruta, 'utf-8')
            return JSON.parse(array)
        } catch (error) {
            console.error(error)
            return []
        }
    }
    async getById(id){
        const carritos=await this.getAll();
        if(carritos.length!=null){
            let carrito=carritos.filter(elem=>elem.id===id)
            if(carrito){
                return carrito;
            }
            else{
                return null
            }
        }
    }
    async saveCarrito(cart){
        const carritos= await this.getAll()
        carritos.push(cart)
        try{
            await fs.promises.writeFile(this.ruta, JSON.stringify(carritos, null, 2))
        }catch(error){

            console.log(error);

        }
    }
    async agregarAlCarrito(carID,producto){
        const cart= await this.getById(Number(carID))
        if(cart===0){
            return null
        }
        const {id,timestamp,productos}=cart[0];
        productos.push(producto);
        let carritos = await this.getAll();
        carritos.map(function(item){
            if(item.id === cart[0].id){
                item.productos=[...item.productos,producto];
            }
        })
        await fs.promises.writeFile(this.ruta,JSON.stringify(carritos,null,2))
        return carritos;
    }
    async deleteById(id){
        const carritos=await this.getAll();
        let arrCarritos=[];
        if(carritos.length!=null){
            arrCarritos=carritos.filter(elem=>elem.id!=id)
        }
        try{
            await fs.promises.writeFile(this.ruta, JSON.stringify(arrCarritos, null, 2))
        }catch(error){
            console.log(error);
        }
    }
    async getAllProductos(cartid){
        const cart= await this.getById(Number(cartid))
        if(cart.length===0){
            return null;
        }
        const {id,timestamp,productos}=cart[0];
        return productos;
    }
    async eliminarProducto(carid,producto){
        const cart= await this.getById(Number(carid))
        if(cart===0){
            return null
        }
        const {id,timestamp,productos}=cart[0];
        let arr=productos;
        let prueba=arr.filter(elem=>elem.id!=producto.id)
        let carritos = await this.getAll();
        carritos.map(function(item){
            if(item.id === cart[0].id){
                item.productos=prueba;
            }
        })
        await fs.promises.writeFile(this.ruta,JSON.stringify(carritos,null,2))
    }

}
export default Carrito;