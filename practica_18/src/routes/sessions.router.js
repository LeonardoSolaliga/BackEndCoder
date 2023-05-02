import { Router } from "express";
import passport from "passport";
import uploader from "../services/upload.js"
import sessionController from "../controller/sessions.controller.js";


const router = Router();

router.post('/register',uploader.single('avatar'),sessionController.register)

router.post('/login',passport.authenticate('login',{failureRedirect:'/api/sessions/loginFail',failureMessage:true}),sessionController.login)


router.get('/loginFail',sessionController.loginFail)

router.get('/github',passport.authenticate('github'),sessionController.logGithub)

router.get('/githubcallback',passport.authenticate('github'),sessionController.loginGitHub)

export default router;