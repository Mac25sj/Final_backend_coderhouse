import { promises as fs } from "fs";
import { nanoid } from "nanoid";

import mongoose from "mongoose";
import Product from "../models/products.schema.js"; // Asegúrate de que la ruta sea correcta

class ProductManager {
    constructor() {
        this.model = Product;
    }

    async getProducts() {
        try {
            return await this.model.find();
        } catch (error) {
            console.error("Error obteniendo productos:", error);
            return [];
        }
    }

    async addProduct(productData) {
        try {
            const newProduct = new this.model(productData);
            await newProduct.save();
            return "Producto agregado correctamente";
        } catch (error) {
            console.error("Error agregando producto:", error);
            return "Error al agregar producto";
        }
    }

    async getProductById(id) {
        try {
            return await this.model.findById(id);
        } catch (error) {
            console.error("Error obteniendo producto:", error);
            return null;
        }
    }

    async updateProduct(id, updatedData) {
        try {
            const updatedProduct = await this.model.findByIdAndUpdate(id, updatedData, { new: true });
            return updatedProduct ? "Producto actualizado correctamente" : "Producto no encontrado";
        } catch (error) {
            console.error("Error actualizando producto:", error);
            return "Error al actualizar producto";
        }
    }

    async deleteProduct(id) {
        try {
            const deletedProduct = await this.model.findByIdAndDelete(id);
            return deletedProduct ? "Producto eliminado correctamente" : "Producto no encontrado";
        } catch (error) {
            console.error("Error eliminando producto:", error);
            return "Error al eliminar producto";
        }
    }
}

export default ProductManager;


/*
class ProductManager {
    constructor() {
        this.path = "./src/db/products.json";
    }

    async readProducts() {
        try {
            const products = await fs.readFile(this.path, "utf-8");
            return products ? JSON.parse(products) : [];
        } catch (error) {
            console.error("Error leyendo productos:", error);
            return [];
        }
    }

    async writeProducts(products) {
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    }

    async exist(id) {
        const products = await this.readProducts();
        return products.find((prod) => prod.id === id);
    }

    async getProducts() {
        return await this.readProducts();
    }

    async addProduct(product) {
        const products = await this.readProducts();
        product.id = nanoid();
        products.push(product);
        await this.writeProducts(products);
        return "Producto agregado";
    }

    async deleteProducts(id) {
        const products = await this.readProducts();
        const productExists = products.some((prod) => prod.id === id);

        if (productExists) {
            const filteredProducts = products.filter((prod) => prod.id !== id);
            await this.writeProducts(filteredProducts);
            return "Producto eliminado correctamente";
        }

        return "El producto no existe";
    }
}

export default ProductManager;
*/