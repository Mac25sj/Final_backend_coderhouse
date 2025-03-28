import { Router } from "express";
import Controller from "../controller/Controller.js";

const router = Router();
const controller = new Controller();

router.get("/", controller.getProducts);
router.get("/:id", controller.getProductById);
router.post("/", controller.addProduct);
router.put("/:id", controller.updateProduct);
router.delete("/:id", controller.deleteProduct);

export default router;

