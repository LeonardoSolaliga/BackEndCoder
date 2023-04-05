import { Router } from "express";
import passport from "passport";
import uploader from "../services/upload.js"


const router = Router();

router.post('/register',uploader.single('avatar'),register)

router.post('/login',passport.authenticate('login',{failureRedirect:'/api/sessions/loginFail',failureMessage:true}),login)


router.get('/loginFail',loginFail)

router.get('/github',passport.authenticate('github'),logGithub)

router.get('/githubcallback',passport.authenticate('github'),loginGitHub)

export default router;