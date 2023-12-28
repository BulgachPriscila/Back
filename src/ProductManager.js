import { existsSync, promises } from 'fs'

class ProductManager {
    constructor(path) {
        this.path = path
    }
    async getProducts(queryObj) {
        const { limit } = queryObj
        try {
            if (existsSync(this.path)) {
                const productsDB = await promises.readFile(this.path, 'utf-8');
                const productsData = JSON.parse(productsDB);
                return limit ? productsData.slice(0, limit) : productsData;
            } else {
                return []
            }
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async createProduct(product) {
        try {
            const products = await this.getProducts({})
            const { title, description, price, thumbnail, code, stock } = product
            const productsDb = products.find(prod => prod.code === product.code)
            if (productsDb) {
                return console.log("El producto que intenta agregar ya se encuentra en la lista")
            }
            if (!title || !description || !price || !thumbnail || !code || !stock) {
                console.log('Faltan datos en el producto')
            } else {
                const products = await this.getProducts({})
                let id
                if (!products.length) {
                    id = 1
                } else {
                    id = products[products.length - 1].id + 1
                }
                products.push({ id, ...product })
                await promises.writeFile(this.path, JSON.stringify(products))
            }
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts({})
            const product = products.find(p => p.id === id)
            return product
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getProducts({})
            const product = products.find((u) => u.id === id);
        if (product) {
            const newProductsList = products.filter(p => p.id !== id)
            await promises.writeFile(this.path, JSON.stringify(newProductsList))
        }
            return product;

        } catch (error) {
            return error
        }
    }
    async updateProduct(id, obj) {
        try {
            const products = await this.getProducts({});
            const index = products.findIndex((p) => p.id === id);
            if (index === -1) {
                return null;
            }
            const updateProduct = { ...products[index], ...obj };
            products.splice(index, 1, updateProduct);
            await promises.writeFile(this.path, JSON.stringify(products));
            return updateProduct;
        } catch (error) {
            return error;
        }
    }
}


const path = 'DB.json'
export const manager = new ProductManager(path);


