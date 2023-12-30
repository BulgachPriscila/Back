import express from "express";
import productRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import userRouter from "./routes/users.router.js"

const app = express()
app.use(express.json())

app.use("/api/products", productRouter)
app.use("/api/carts", cartsRouter)
app.use("/api/users", userRouter)


app.listen(8080, () => {
    console.log("Escuchando al puerto 8080")
})
