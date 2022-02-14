import { Router } from "express";
import IndexController from "../controller/IndexController";
const router = Router();

router.get("/",IndexController.BatchController.findAllRows);
router.get("/talent",IndexController.BatchController.findTalentBatch);
router.get("/batch",IndexController.BatchController.findBatch);
router.post("/",IndexController.BatchController.createBatch,IndexController.BatchController.createTalentBatch);
export default router;

