import { Router } from "express";
import indexController from "../controllers/indexController";
import UploadDownloadHelper from "../middleware/UploadDownloadHelper";

const router = Router();

router.post("/images",UploadDownloadHelper.uploadImages,indexController.imageController.create)
router.get("/", indexController.imageController.findAll);
router.get("/:id", indexController.imageController.findOne);
router.delete("/:id",indexController.imageController.deleteRow);
router.put("/:id",UploadDownloadHelper.uploadImages,indexController.imageController.update);
export default router;