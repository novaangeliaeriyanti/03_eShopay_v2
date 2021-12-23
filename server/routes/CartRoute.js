import { Router } from "express";
import indexController from "../controllers/IndexController";

const router = Router();

router.post("/:id",indexController.cartController.create,indexController.lineItemsController.create)
router.delete("/:id",indexController.cartController.deleteRow,indexController.lineItemsController.deleteRow)
router.get("/", indexController.cartController.findAll);
router.get("/:id",indexController.cartController.findOne,indexController.lineItemsController.findOne)
//router.get("/:id",indexController.cartController.findOne)
export default router;
