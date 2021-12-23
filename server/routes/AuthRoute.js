import { Router } from "express";
import authJWT from "../middleware/authJWT";
import IndexController from "../controllers/IndexController";

const router = Router();

router.post("/signin",authJWT.authenticate,authJWT.login);
//router.post("/signin",authJWT.login)
//router.post("/signin",IndexController.userController.signin);

export default router;