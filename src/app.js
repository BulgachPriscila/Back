import express from "express";
import { manager } from "./ProductManager.js";

const app = express()
app.use(express.json())


app.get("/api/products", async (req, res) => {
    try {
        const products = await manager.getProducts(req.query)
        res.status(200).json({ message: "Products found", products })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
app.get("/api/products/:id", async (req, res) => {
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
app.post("/api/products", async (req, res) => {
    const { title, price, stock } = req.body
    if (!title || !price || !stock) {
        return res.status(400).json({ message: "Faltan datos del producto" })
    }
    try {
        const response = manager.createProduct(req.body)
        res.status(200).json({ message: "Producto creado", product: response });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
app.delete("/api/products/:id", async (req, res) => {
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
app.put("/api/products/:id", async (req, res) => {
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


app.listen(8080, () => {
    console.log("Escuchando al puerto 8080")
})
