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
    if(result.status==="success"){
        /*await transporter.sendMail({
            from:'Leo <leo.nosecuanto@gmail.com>',
            to:"solaliga_84@hotmail.com",
            subject:'Correo de prueba :)',
            html:`<div><h1 style="color:red;">se creo una cuenta :)</h1></div>`,
        })*/
        window.location.replace('/login')
    }
    else
        alert(result.error);
})