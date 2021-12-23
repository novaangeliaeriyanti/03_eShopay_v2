import { Router } from "express";
import indexController from '../controllers/IndexController'

const router = Router();

// method post
router.post("/signup",indexController.userController.signup);
router.post("/signin",indexController.userController.signin);
router.put("/:id", indexController.userController.update);
router.get("/:id",indexController.userController.findOne);
router.get("/",indexController.userController.findAll);
router.delete("/:id",indexController.userController.deleteRow);
export default router;