import ProductManager from "../managers/ProductManager.js";
import CartManager from "../managers/CartManager.js";

const productManager = new ProductManager();
const cartManager = new CartManager();

class Controller {
    // Productos 
    async getProducts(req, res) {
        try {
            const products = await productManager.getProducts();
            res.json({ status: 'Resultado correcto', payload: products });
        } catch (error) {
            res.status(500).json({ status: 'error', error: error.message });
        }
    }

    async getProductById(req, res) {
        try {
            const product = await productManager.getProductsById(req.params.id);
            if (typeof product === 'string') { 
                return res.status(404).json({ status: 'error', error: product });
            }
            res.json({ status: 'Resultado correcto', payload: product });
        } catch (error) {
            res.status(500).json({ status: 'error', error: error.message });
        }
    }

    async addProduct(req, res) {
        try {
            const result = await productManager.addProduct(req.body);
            res.json({ status: 'Resultado correcto', message: result });
        } catch (error) {
            res.status(500).json({ status: 'error', error: error.message });
        }
    }

    async updateProduct(req, res) {
        try {
            const result = await productManager.updateProducts(req.params.id, req.body);
            if (typeof result === 'string') {
                return res.status(404).json({ status: 'error', error: result });
            }
            res.json({ status: 'Resultado correcto', message: result });
        } catch (error) {
            res.status(500).json({ status: 'error', error: error.message });
        }
    }

    async deleteProduct(req, res) {
        try {
            const result = await productManager.deleteProducts(req.params.id);
            if (typeof result === 'string') {
                return res.status(404).json({ status: 'error', error: result });
            }
            res.json({ status: 'Resultado correcto', message: result });
        } catch (error) {
            res.status(500).json({ status: 'error', error: error.message });
        }
    }

    // Carritos Configuración 
    async createCart(req, res) {
        try {
            const result = await cartManager.addCarts();
            res.json({ status: 'Resultado correcto', message: result });
        } catch (error) {
            res.status(500).json({ status: 'error', error: error.message });
        }
    }

    async getCartById(req, res) {
        try {
            const cart = await cartManager.getCartById(req.params.id);
            if (typeof cart === 'string') {
                return res.status(404).json({ status: 'error', error: cart });
            }
            res.json({ status: 'Resultado correcto', payload: cart });
        } catch (error) {
            res.status(500).json({ status: 'error', error: error.message });
        }
    }

    async addProductToCart(req, res) {
        try {
            const { cid, pid } = req.params;
            const result = await cartManager.addProductInCart(cid, pid);
            res.json({ status: 'Resultado correcto', message: result });
        } catch (error) {
            res.status(500).json({ status: 'error', error: error.message });
        }
    }
}

export default Controller;