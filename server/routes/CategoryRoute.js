import { Router } from "express";
import indexController from "../controllers/IndexController";

const router = Router();

router.get("/", indexController.cateController.findAll);
router.get("/:id", indexController.cateController.findOne);
router.post("/", indexController.cateController.create);
router.put("/:id", indexController.cateController.update);
router.delete("/:id", indexController.cateController.deleteRow);

export default router;
