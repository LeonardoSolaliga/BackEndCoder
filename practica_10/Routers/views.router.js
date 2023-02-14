import { Router } from "express";

const router = Router();
router.get("/", async(req, res)=>{
    req.session.cookie.expires = new Date(Date.now() + 30000)
    console.log(req.session.user)
    res.render("inicio",{user:req.session.user});
});
router.get('/register',(req,res)=>{

    res.render('register',{});
})

router.get('/login',(req,res)=>{
    res.render('login',{});
})

export default router;