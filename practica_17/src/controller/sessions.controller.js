//import {getUserBy,createUser} from '../DAOs/UserDAO.js'
//import userModel from "../Model/user.js"
import {cartsService, usersService} from '../DAOs/index.js'
import { createHash } from "../utils.js";
import Mailer from "../services/nodemailer.js"
import userDTO from "../DAOs/DTO/userDTO.js"


const register = async (req, res) => {
    const file = req.file;
    if (!file) return res.status(500).send({ status: "error", error: "error al cargar el archivo" });
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !email || !password) return res.status(400).send({ status: "error", error: "Valores incompletos" });
    const exists = await usersService.getUserBy({ email })
    //const exists  = await userModel.findOne({email});
    if (exists) return res.status(400).send({ status: "error", error: "El usuario ya existe" });
    const hashedPassword = await createHash(password);
    let cart = await cartsService.createCart();
    const result = await usersService.createUser({ first_name, last_name, email, password: hashedPassword, cart: cart._id, avatar: `${req.protocol}://${req.hostname}:8080/img/${file.filename}` })
    /*const result = await userModel.create({
        first_name,
        last_name,
        email,
        password:hashedPassword,
        avatar:`${req.protocol}://${req.hostname}:8080/img/${file.filename}`
    })*/
    await Mailer.sendMail({
        from: 'Leo <leo.nosecuanto@gmail.com>',
        to: email,
        subject: 'Correo de prueba :)',
        html: `<div><h1 style="color:red;">se creo una cuenta :)</h1></div>`,
    })

    res.send({ status: "success", payload: result,message:"Registrado" })
}
const login = async (req, res) => {
    const user = req.user;
    req.session.user = userDTO.getuserDTO(user)
    res.send({ status: "success", message: "Logueado :)" })
}

const loginFail = async (req, res) => {
    if (req.session.messages.length > 4) return res.status(400).send({ message: "Bloquea los intentos" })
    res.status(400).send({ status: "error", error: "error de autentificacion" })
}
const logGithub = (req, res) => { }
const loginGitHub = (req, res) => {
    const user = req.user;
    req.session.user = userDTO.getuserDTO(user)
    res.send({ status: "success", message: "Logueado con github :)" })
}

export default {
    register,
    login,
    loginFail,
    logGithub,
    loginGitHub
}