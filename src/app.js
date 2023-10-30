import  express  from "express";
import { manager } from "./ProductManager.js";

const app = express()

app.get("/api/products", async(req,res)=>{
    const products = await manager.getProducts(req.query)
    res.json({message:"Products found", products})
} )
app.get("/api/products/:id", async(req,res)=>{
    const {id} = req.params
    const product = await manager.getProductById(+id)
    res.json({message:"Products found", product})
})





app.listen(8080, ()=> {
    console.log ("Escuchando al puerto 8080")
})
