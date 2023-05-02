import { Router } from "express";
import viewController from "../controller/views.controller.js"
let router = new Router();

function isLoggedIn(req, res, next){
    req.session.user ? next() : res.redirect("/login")
}


router.get("/",isLoggedIn,viewController.inicio);
router.get('/register',viewController.register)

router.get('/login',viewController.login)
router.get('/logout',viewController.logout)
router.get('/profile',viewController.profile)
router.get('/crearProduct',viewController.crearProducto)
router.get('/carts',viewController.cart)

export default router;