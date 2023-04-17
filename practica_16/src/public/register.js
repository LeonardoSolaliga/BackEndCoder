

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
    const data2 = new FormData(form);
    const obj = {};
    data2.forEach((value,key)=>obj[key]=value)
    const response = await fetch('/api/sessions/register',{
        method:'POST',
        body:data
    })
    const result = await response.json();
    if(result.status==="success"){
        await fetch('/api/carrito',{
            method:'POST',
            body:JSON.stringify(obj),
            headers:{
                "Content-Type":"application/json"
            }
        })
        window.location.replace('/login')
    }
    else
        alert(result.error);
})