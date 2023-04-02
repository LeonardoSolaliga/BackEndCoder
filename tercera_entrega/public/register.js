

/*import nodemailer from 'nodemailer'
const GMAIL_PWD = 'ishujxivijablmcl';
const GMAIL_USER = "leo.nosecuanto@gmail.com";
const transporter = nodemailer.createTransport({
    service:'gmail',
    port: 587,
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_PWD
    }
});*/

const form = document.getElementById('registerForm');

form.addEventListener('submit',async evt=>{
    evt.preventDefault();
    const data = new FormData(form);
    const response = await fetch('/api/sessions/register',{
        method:'POST',
        body:data
    })
    const result = await response.json();
    console.log(result.payload.email)//solaliga_84@hotasdasd
    if(result.status==="success"){
        await fetch('/api/carrito',{
            method:'POST',
            body:data
        })
        window.location.replace('/login')
    }
    else
        alert(result.error);
})