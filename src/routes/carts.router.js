import { Router } from "express";
import { cartManager } from "../CartsManager.js";

const router = Router()

router.post("/", async (req, res) =>{
    try {
        const cart = await cartManager.createCart()
        res.status(200).json({message: "Carrito creado", cart})
    } catch (error) {
        return(error)
    }
})

router.get("/", async (req, res) => {
    try {
        const carts = await cartManager.getCarts()
        res.status(200).json({ message: "Carts", carts })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
    router.get("/:cId", async (req, res) => {
        const { id } = req.params
        try {
            const cart = await cartManager.getCartById(id)
            if (!cart) {
                return res.status(404).json({ message: "No se econtró un carrito con ese ID" })
            }
            res.status(200).json({ message: "Cart found", cart })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }

})
router.post("/:cId/products/:pId", async(req, res) =>{
    const { cId, pId} = req.params
    if (!cId || !pId) {
        return res.status(400).json({ message: "Faltan datos del producto" })
    }
    try {
        const response = cartManager.addToCart(cId, pId)
        res.status(200).json({ message: "carrito creado", cart: response });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default router