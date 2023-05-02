
const form = document.getElementById('ProductoForm');

form.addEventListener('submit',async evt=>{
    evt.preventDefault();
    const data = new FormData(form);
    const response = await fetch("/api/products",{
        method:"POST",
        body:data
    })
    const result = await response.json();
    console.log(result);
})