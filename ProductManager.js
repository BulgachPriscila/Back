import { existsSync, promises } from 'fs'

class ProductManager {
    constructor(path) {
        this.path = path
    }
    async getProducts(queryObj) {
        console.log("queryObj", queryObj)
        const {limit} = queryObj
        try {
            if (existsSync(this.path)) {
                const productsDB = await promises.readFile(this.path, 'utf-8');
                const productsData = JSON.parse (productsDB);
                return limit ? productsData.slice(0, limit) : productsData;
            } else {
                return []
            }
        } catch (error) {
            return error
        }
    }

    async createProduct(product) {
        try {
            const products = await this.getProducts()
            const { title, description, price, thumbnail, code, stock } = product
            const productsDb = products.find(prod => prod.code === product.code)
            if (productsDb) {
                return console.log ("El producto que intenta agregar ya se encuentra en la lista")
            }
            if (!title || !description || !price || !thumbnail || !code || !stock) {
                console.log('Faltan datos en el producto')
            } else {
                const products = await this.getProducts()
                let id
                if (!products.length) {
                    id = 1
                } else {
                    id = products[products.length - 1].id + 1
                }
                products.push({ id, ...product })
                await promises.writeFile(path, JSON.stringify(products))
            }
        } catch (error) {
            return error
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts()
            const product = products.find(p => p.id === id)
            if (!product) {
                return 'No se encuentra el producto'
            } else {
                return product
            }
        } catch (error) {
            return error
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getProducts()
            const newProductsList = products.filter(p => p.id !== id)
            await promises.writeFile(path, JSON.stringify(newProductsList))
            console.log('elemento eliminado')


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
            await promises.writeFile(path, JSON.stringify(products));
            return updateProduct;
        } catch (error) {
            return error;
        }
    }
}

const primerP =
{
    title: "producto 1",
    description: "poiuy",
    price: 11,
    thumbnail: "./bla",
    code: 1,
    stock: 10
}
const segundoP =
{
    title: "producto 2",
    description: "zxcvb",
    price: 22,
    thumbnail: "./bla",
    code: 2,
    stock: 15
}
const tercerP =
{
    title: "producto 3",
    description: "qwerty",
    price: 33,
    thumbnail: "./bla",
    code: 3,
    stock: 20
}
const cuartoP =
{
    title: "producto 4",
    description: "asdf",
    price: 44,
    thumbnail: "./bla",
    code: 4,
    stock: 25
}
/*async function test() {
    const path = 'DB.json'
    const manager = new ProductManager(path)
    await manager.createProduct(primerP)
    await manager.createProduct(segundoP)
    await manager.createProduct(tercerP)
    await manager.createProduct(cuartoP)
    //const products = await manager.getProducts()
    //await manager.updateProduct(2, tercerP)
    //console.log(products);
    //await manager.deleteProduct(1)

test() 
}*/


const path = 'DB.json'
export const manager = new ProductManager(path);


