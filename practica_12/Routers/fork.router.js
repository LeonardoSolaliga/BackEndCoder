import { Router } from "express";

const router = Router();
router.get("/",async(req, res)=>{
    res.json({hola:"hola"})
});

export default router;