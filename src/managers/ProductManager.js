import { promises as fs } from "fs";
import { nanoid } from "nanoid";

class ProductManager {
    constructor() {
        this.path = "./src/models/products.json";
    }

    readProducts = async () => {
        try {
            let products = await fs.readFile(this.path, "utf-8");
            return products ? JSON.parse(products) : [];
        } catch (error) {
            console.error("Error leyendo productos:", error);
            return [];
        }
    };

    writeProducts = async (products) => {
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    };

    exist = async (id) => {
        let products = await this.readProducts();
        return products.find((prod) => prod.id === id);
    };

    addProduct = async (product) => {
        let productsOld = await this.readProducts();
        product.id = nanoid();
        let productsAll = [...productsOld, product];
        await this.writeProducts(productsAll);
        return "Producto agregado";
    };

    getProducts = async () => {
        return await this.readProducts();
    };

    updateProducts = async (id, product) => {
        let productById = await this.exist(id);
        if (!productById) return "Producto no encontrado, por favor verificar";

        let productsOld = await this.readProducts();
        let products = productsOld.filter((prod) => prod.id !== id);
        products.push({ ...productById, ...product, id });

        await this.writeProducts(products);
        return "Producto actualizado con éxito";
    };

    getProductsById = async (id) => {
        let productById = await this.exist(id);
        if (!productById) return "Producto no encontrado, por favor verificar";
        return productById;
    };

    deleteProducts = async (id) => {
        let products = await this.readProducts();
        let existProducts = products.some((prod) => prod.id === id);
        if (existProducts) {
            let filterProducts = products.filter((prod) => prod.id !== id);
            await this.writeProducts(filterProducts);
            return "El producto se ha eliminado correctamente";
        }
        return "El producto que deseas eliminar es inexistente. Verifica nuevamente el ID";
    };
}

export default ProductManager;
