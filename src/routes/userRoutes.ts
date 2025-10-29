import { Router } from "express";
import { userController } from "../controllers/userController";
import { validate } from "../middlewares/validate";
import {
  createUserSchema,
  getUsersSchema,
} from "../validations/userValidation";

const router = Router();

router.post("/", validate(createUserSchema), userController.createUser);
router.get("/", validate(getUsersSchema), userController.getUsers);

export default router;
