
async function obtenerProducto() {
    let carrito = []
    try {
        const response = await fetch('/api/products', {
            method: 'GET'
        })
        const productos = await response.json()
        console.log(productos)

        productos.forEach((product, indice) => {
            contador=0;
            let botonSuma = document.getElementById(`botonAdd${indice}`)
            botonSuma.addEventListener("click", (e) => {
                e.preventDefault();
                console.log("entre");
                
                let cont=document.getElementById(`cont${indice}`)
                contador++;
                cont.innerHTML=contador;
                
            });
        });
    } catch (error) {
        console.log(error);
    }
    const finalizarCompra = document.getElementById("Finalizar");
    finalizarCompra.addEventListener("click", async () => {
        console.log("hola")
    })

}

obtenerProducto()
