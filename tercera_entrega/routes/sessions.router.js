import { Router } from "express";
import passport from "passport";
import userModel from "../Model/user.js"
import { createHash} from "../utils.js";
import uploader from "../upload/upload.js"
import nodemailer from 'nodemailer'

const GMAIL_PWD = 'ishujxivijablmcl';
const GMAIL_USER = "leo.nosecuanto@gmail.com";

const transporter = nodemailer.createTransport({
    service:'gmail',
    port: 587,
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_PWD
    }
});

const router = Router();

router.post('/register',uploader.single('avatar'),async(req,res)=>{
    const file=req.file;
    if (!file) return res.status(500).send({status:"error",error:"error al cargar el archivo"});
    const {first_name,last_name,email,password} = req.body;
    if(!first_name||!email||!password) return res.status(400).send({status:"error",error:"Valores incompletos"});
    const exists  = await userModel.findOne({email});
    if(exists) return res.status(400).send({status:"error",error:"El usuario ya existe"});
    const hashedPassword=await createHash(password);
    const result = await userModel.create({
        first_name,
        last_name,
        email,
        password:hashedPassword,
        avatar:`${req.protocol}://${req.hostname}:8080/img/${file.filename}`
    })
    await transporter.sendMail({
        from:'Leo <leo.nosecuanto@gmail.com>',
        to:email,
        subject:'Correo de prueba :)',
        html:`<div><h1 style="color:red;">se creo una cuenta :)</h1></div>`,
    })

    res.send({status:"success",payload:result})
    
})

router.post('/login',passport.authenticate('login',{failureRedirect:'/api/sessions/loginFail',failureMessage:true}),async(req,res)=>{
    const user=req.user;
    req.session.user = {
        id: user._id,
        nombre:user.first_name,
        email:user.email,
        role:user.role,
        avatar:user.avatar
    }
    res.send({status:"success",message:"Logueado :)"})
})

router.get('/loginFail',async(req,res)=>{
    if(req.session.messages.length>4) return res.status(400).send({message:"Bloquea los intentos"})
    res.status(400).send({status:"error",error:"error de autentificacion"})
})

router.get('/github',passport.authenticate('github'),(req,res)=>{})

router.get('/githubcallback',passport.authenticate('github'),(req,res)=>{
    const user=req.user;
    req.session.user = {
        id: user._id,
        nombre:user.first_name,
        email:user.email,
        role:user.role
    }
    res.send({status:"success",message:"Logueado con github :)"})
})

export default router;