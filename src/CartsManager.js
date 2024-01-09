import { existsSync, promises } from 'fs'
import { manager } from './ProductManager.js';


const path = 'cartsDB.json'

class CartsManager {
    constructor(path) {
        this.path = path
    }
    async getCarts() {
        try {
            if (existsSync(this.path)) {
                const cartsDB = await promises.readFile(this.path, 'utf-8');
                const cartsData = JSON.parse(cartsDB);
                return cartsData
            } else {
                return []
            }
        } catch (error) {
            return error
        }
    }

    async createCart() {
        try {
            const carts = await this.getCarts()
            let id
            if (!carts.length) {
                id = 1
            } else {
                id = carts[carts.length - 1].id + 1
            }
            carts.push({ id, productos: [] })
            await promises.writeFile(this.path, JSON.stringify(carts))
        } catch (error) {
            return error
        }
    }

    async getCartById(id) {
        try {
            const carts = await this.getCarts()
            const cart = carts.find(c => c.id === id)
            return cart
        } catch (error) {
            return error
        }
    }

    async addToCart(cId, pId) {
        try {
            const cart = await this.getCartById(cId)
            if (!cart) {
                console.log("No existe un carrito con ese ID")
            }
            const product = await manager.getProductById(pId)
            if (!product) {
                console.log("No existe un producto con ese ID")
            }
            const pIndex = cart.productos.findIndex((p) => p.product === pId)
            if (pIndex === -1) {
            cart.productos.push({ product: pId, quantity: 1 })
            } else {
            cart.productos[pIndex].quantity++
            }
            return this.getCartById(cId)
        } catch (error) {
            return error
        }
    }
}

export const cartManager = new CartsManager(path);