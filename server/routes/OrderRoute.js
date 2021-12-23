import { Router } from "express";
import indexController from "../controllers/IndexController";

const router = Router();

router.get("/", indexController.orderController.findAll);
//router.post("/:id", indexController.orderController.create);
router.delete("/:id",indexController.orderController.deleteRow);
router.put("/:id", indexController.orderController.update);
router.post("/:id", indexController.orderController.create,
indexController.cartController.updateStatus,indexController.lineItemsController.updateStatus)

export default router;
