/*
async function obtenerProducto() {
    try {
        const response = await fetch('/api/products', {
            method: 'GET'
        })
        const resCart=await fetch('/api/carrito/CarritoEspecifico',{
            method:'GET'
        })
        const carrito=await resCart.json();
        const productos = await response.json();
        const CartOficial=carrito[0];

        productos.forEach((product, indice) => {
            contador=1;
            let botonSuma = document.getElementById(`botonAdd${indice}`)
            botonSuma.addEventListener("click", (e) => {
                e.preventDefault();
                if (contador<=product.stock){
                    let cont=document.getElementById(`cont${indice}`)
                    contador++;
                    cont.innerHTML=contador;
                }else{
                    alert("no puede ingresar un numero mas alto que el stock")
                }

            });
            let botonResta=document.getElementById(`botonRes${indice}`)
            botonResta.addEventListener("click", (e) => {
                e.preventDefault();
                if (1<contador){
                    let cont=document.getElementById(`cont${indice}`)
                    contador--;
                    cont.innerHTML=contador;
                }else{
                    alert("no puede ingresar un numero menor que el 1")
                }

            });
            let botonAgregar=document.getElementById(`botonAgregar${indice}`);
            botonAgregar.addEventListener("click",async(e)=>{
                e.preventDefault();
                const prodtExiste=CartOficial.productos.find((obj) => obj.code === product.code)
                if(prodtExiste){
                    const prodCart = {
                        product: product
                    }
                    //Borro el producto
                    await fetch(`/api/carrito/${CartOficial.cartId}/productos/${product.code}`,{
                        method:'DELETE'
                    })
                    //Agrego el nuevo con sus cantidades
                    await fetch(`/api/carrito/${product.code}/productos`,{
                        method:'POST',
                        body:JSON.stringify(prodCart),
                        headers:{
                            "Content-Type":"application/json"
                        }
                    })
                }else{
                    const prodCart = {
                        product: product
                    }
                    prodCart.product.cantidad=contador
                    CartOficial.productos.push(prodCart.product)
                    await fetch(`/api/carrito/${product.code}/productos`,{
                        method:'POST',
                        body:JSON.stringify(prodCart),
                        headers:{
                            "Content-Type":"application/json"
                        }
                    })
                }
            })

        });
    } catch (error) {
        console.log(error);
    }
}
async function Finalizar(){
    try{
        const finalizarCompra = document.getElementById("Finalizar");
        finalizarCompra.addEventListener("click", async () => {
            await fetch(`/api/carrito/finalizar`,{
                method:'POST'
            })
        })

    }catch(error){
        return error
    }
} 
obtenerProducto()
Finalizar();
*/

async function obtenerCantidad() {
    const paginacion=Number(document.getElementById("page").innerText)
    const response = await fetch(`/api/products/?page=${paginacion}`, {
        method: 'GET'
    })
    const productos = await response.json();
    console.log(productos)
    productos.forEach((product, indice) => {
        contador=1;
        let botonSuma = document.getElementById(`botonAdd${indice}`)
        botonSuma.addEventListener("click", (e) => {
            e.preventDefault();
            if (contador<product.stock){
                let cont=document.getElementById(`cont${indice}`)
                contador++;
                cont.innerHTML=contador;
            }else{
                alert("no puede ingresar un numero mas alto que el stock")
            }

        });
        let botonResta=document.getElementById(`botonRes${indice}`)
        botonResta.addEventListener("click", (e) => {
            e.preventDefault();
            if (1<contador){
                let cont=document.getElementById(`cont${indice}`)
                contador--;
                cont.innerHTML=contador;
            }else{
                alert("no puede ingresar un numero menor que el 1")
            }

        });
        let botonAgregar=document.getElementById(`botonAgregar${indice}`);
        botonAgregar.addEventListener("click",async(e)=>{
            const productonuevo={_id:product._id,quantity:contador}
            console.log(productonuevo)
            await fetch(`/api/carrito/${product.code}/productos`,{
                method:'POST',
                body:JSON.stringify(productonuevo),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            window.location.replace('/carts')
        })
    })

}



obtenerCantidad()