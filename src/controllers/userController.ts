import { Request, Response, NextFunction } from "express";
import { userService } from "../services/userService";
import { AppError } from "../utils/appError";

export const userController = {
  // Create a new user
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email } = req.body;

      const user = await userService.createUser(name, email);
      res.status(201).json({
        status: "success",
        data: user,
      });
    } catch (error: any) {
      if (error.code === "P2002") {
        // Prisma duplicate constraint
        return next(new AppError("Email already exists", 409));
      }
      next(error);
    }
  },

  // Get users with pagination
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const usersPaginated = await userService.getUsersPaginated(page, limit);

      res.status(200).json({
        status: "success",
        ...usersPaginated,
      });
    } catch (error) {
      next(error);
    }
  },
};
