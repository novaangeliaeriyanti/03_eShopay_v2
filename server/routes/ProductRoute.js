import { Router } from "express";
import indexController from "../controllers/IndexController";
import UploadDownloadHelper from "../middleware/UploadDownloadHelper";
const router = Router();

router.get("/", indexController.productController.findAll);
router.get("/:id", indexController.productController.findOne);
//router.post("/", indexController.productController.create);
router.post(
  "/",
  UploadDownloadHelper.uploadImages,
  indexController.productController.create,
  indexController.imageController.create1
);
router.put("/:id", indexController.productController.update);
router.delete("/:id", indexController.productController.deleteRow);
router.get("/images/:filename", UploadDownloadHelper.showImage);

export default router;
