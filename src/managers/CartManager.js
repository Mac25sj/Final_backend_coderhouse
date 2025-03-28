import mongoose from "mongoose";
import Cart from "../models/carts.schema.js";
import Product from "../models/products.schema.js"; // Asegúrate de que la ruta sea correcta

class CartManager {
    constructor() {
        this.model = Cart;
    }

    async addCart() {
        try {
            const newCart = new this.model({ products: [] });
            await newCart.save();
            return "Carrito agregado correctamente";
        } catch (error) {
            console.error("Error al agregar carrito:", error);
            return "Error al crear el carrito";
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await this.model.findById(cartId).populate("products.product");
            return cart ? cart : "Carrito no encontrado, por favor verificar";
        } catch (error) {
            console.error("Error obteniendo carrito:", error);
            return "Error al buscar carrito";
        }
    }

    async addProductInCart(cartId, productId) {
        try {
            const cart = await this.model.findById(cartId);
            if (!cart) return "Carrito no encontrado, por favor verificar";

            const product = await Product.findById(productId);
            if (!product) return "Producto no encontrado";

            // Verificar si el producto ya está en el carrito
            const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

            if (productIndex !== -1) {
                // Si el producto ya existe, aumentar cantidad
                cart.products[productIndex].quantity++;
            } else {
                // Si el producto no está en el carrito, agregarlo
                cart.products.push({ product: productId, quantity: 1 });
            }

            await cart.save();
            return "Producto agregado correctamente al carrito";
        } catch (error) {
            console.error("Error agregando producto al carrito:", error);
            return "Error al agregar producto al carrito";
        }
    }

    async deleteCart(cartId) {
        try {
            const deletedCart = await this.model.findByIdAndDelete(cartId);
            return deletedCart ? "Carrito eliminado correctamente" : "Carrito no encontrado";
        } catch (error) {
            console.error("Error eliminando carrito:", error);
            return "Error al eliminar carrito";
        }
    }
}

export default CartManager;



/*import { promises as fs } from 'fs';
import { nanoid } from 'nanoid';
import ProductManager from './ProductManager.js';

const ProductAll = new ProductManager();

class CartManager {
    constructor() {
        this.path = "./src/db/carts.js";
    }

    readCarts = async () => {
        let carts = await fs.readFile(this.path, "utf-8");
        return JSON.parse(carts);
    }

    writeCarts = async (carts) => {
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    }

    exist = async (id) => {
        let carts = await this.readCarts();
        return carts.find(cart => cart.id === id);
    }

    addCarts = async () => {
        let cartsOld = await this.readCarts();
        let id = nanoid();
        let cartsConcat = [{ id: id, products: [] }, ...cartsOld];
        await this.writeCarts(cartsConcat);
        return "Carrito agregado";
    }

    getCartById = async (id) => {
        let cartById = await this.exist(id);
        if (!cartById) return "Carrito no encontrado, por favor verificar";
        return cartById;
    }

    addProductInCart = async (cartId, productId) => {
        let cartById = await this.exist(cartId);
        if (!cartById) return "Carrito no encontrado, por favor verificar";

        let productById = await ProductAll.exist(productId);
        if (!productById) return "Producto no encontrado";

        let cartsAll = await this.readCarts();

        if (cartById.products.some(prod => prod.id === productId)) {
            let productInCart = cartById.products.find(prod => prod.id === productId);
            productInCart.cantidad++;
        } else {
            let cartFilter = cartsAll.filter(cart => cart.id !== cartId);
            let cartsConcat = [{ id: cartId, products: [{ id: productById.id, cantidad: 1 }] }, ...cartFilter];
            await this.writeCarts(cartsConcat);
            return "Producto agregado correctamente";
        }

        await this.writeCarts(cartsAll);
        return "Producto sumando al carrito";
    }
}

export default CartManager;
*/