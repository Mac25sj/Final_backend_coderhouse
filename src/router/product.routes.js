import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const productManager = new ProductManager();
const ProductRouter = Router();

ProductRouter.get("/:id", async (req, res) => {
    let id = req.params.id;
    res.send(await productManager.getProductsById(id));
});

ProductRouter.get("/", async (req, res) => {
    res.send(await productManager.getProducts());
});

ProductRouter.delete("/:id", async (req, res) => {
    let id = req.params.id;
    res.send(await productManager.deleteProducts(id));
});

ProductRouter.put("/:id", async (req, res) => {
    let id = req.params.id;
    let updateProduct = req.body;
    res.send(await productManager.updateProducts(id, updateProduct));
});

ProductRouter.post("/", async (req, res) => {
    let newProduct = req.body;
    res.send(await productManager.addProducts(newProduct));
});

export default ProductRouter;