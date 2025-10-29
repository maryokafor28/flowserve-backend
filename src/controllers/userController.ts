import { Request, Response } from "express";
import { userService } from "../services/userService";

export const userController = {
  async createUser(req: Request, res: Response) {
    try {
      const { name, email } = req.body;

      if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
      }

      const user = await userService.createUser(name, email);
      res.status(201).json(user);
    } catch (error: any) {
      if (error.code === "P2002") {
        return res.status(409).json({ error: "Email already exists" });
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getUsers(_req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
