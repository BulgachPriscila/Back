import { Router } from "express"
import { manager } from "../ProductManager.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const router = Router()

router.get("/", async (req, res) => {
    try {
        const products = await manager.getProducts(req.query)
        res.status(200).json({ message: "Products found", products })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})
router.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const product = await manager.getProductById(+id)
        if (!product) {
            return res.status(404).json({ message: "No se econtró un producto con ese ID" })
        }
        res.status(200).json({ message: "Products found", product })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.post("/", authMiddleware, async (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body
    if (!title || !description || !price || !thumbnail || !code || !stock) {
        return res.status(400).json({ message: "Faltan datos del producto" })
    }
    try {
        const response = manager.createProduct(req.body)
        res.status(200).json({ message: "Producto creado", product: response });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const response = await manager.deleteProduct(+id);
        if (!response) {
            return res.status(404).json({ message: "No se encontró un producto con ese ID" });
        }
        res.status(200).json({ message: "Producto eliminado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const response = await manager.updateProduct(+id, req.body);
        if (!response) {
            return res.status(404).json({ message: "No se encontró un producto con ese ID" });
        }
        res.status(200).json({ message: "Producto actualizado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router