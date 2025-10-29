import { Router } from "express";
import { userController } from "../controllers/userController";

const router = Router();

router.post("/", userController.createUser);
router.get("/", userController.getUsers);

export default router;
