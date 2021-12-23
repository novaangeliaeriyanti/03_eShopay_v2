import { Router } from "express";
import indexController from "../controllers/IndexController";

const router = Router();

//router.delete("/:id", indexController.lineItemsController.deleteRow);
router.put("/:id", indexController.lineItemsController.update);
export default router;
