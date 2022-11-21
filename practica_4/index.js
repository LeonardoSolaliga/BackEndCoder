const express=require ("express");
const app=express();
const PORT=process.env.PORT || 8080;
let serverRoutes=require("./routes/productosRouter");


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

serverRoutes(app);





app.listen(PORT,()=>console.log("server on"));

