import { Router } from "express";
import Controller from "../controller/Controller.js";

const router = Router();
const controller = new Controller();

router.post("/", controller.createCart);
router.get("/:id", controller.getCartById);
router.post("/:cid/products/:pid", controller.addProductToCart);

export default router;


