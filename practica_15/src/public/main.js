
const socket=io();

const newProduct = document.getElementById('newProduct')
newProduct.addEventListener('submit', event => {
  event.preventDefault()
  let title = document.getElementById('title').value
  let price = document.getElementById('price').value
  let thumbnail = document.getElementById('thumbnail').value
  socket.emit('newproduct', {
    title : title,
    price : price,
    thumbnail : thumbnail
  })
  newProduct.reset();
})
socket.on("connect",()=>{
    console.warn("conectado al servidor");
})

socket.on('UpdateProduct', async(products) => {
    fetch('./views/productos.handlebars')
      .then(res => {
        return res.text()
      })
      .then(plantilla=> {
        
        let template = Handlebars.compile(plantilla);
        let booleano=!products.length
        let html = template({products,boole:booleano})
        document.getElementById('container-products').innerHTML = html;
        })
  })