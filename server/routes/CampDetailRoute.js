import { Router } from "express";
import IndexController from "../controller/IndexController";
const router = Router();
router.get("/",IndexController.CampDetailController.findAllRows);
router.get("/:id",IndexController.CampDetailController.findRow);
export default router;