import { Request, Response } from "express";
import { transactionService } from "../services/transactionService";
import { TransactionStatus } from "@prisma/client";

export const transactionController = {
  async createTransaction(req: Request, res: Response) {
    try {
      const { amount, description, senderId, receiverId } = req.body;

      const transaction = await transactionService.createTransaction(
        amount,
        description,
        senderId,
        receiverId
      );

      res.status(201).json({
        message: "Transaction created successfully",
        transaction,
      });
    } catch (error: any) {
      res
        .status(400)
        .json({ error: error.message || "Failed to create transaction" });
    }
  },

  async getTransactions(req: Request, res: Response) {
    try {
      const { page, limit, status } = req.query;

      const result = await transactionService.getTransactions(
        Number(page) || 1,
        Number(limit) || 10,
        status as TransactionStatus | undefined
      );

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch transactions" });
    }
  },

  async updateTransactionStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updated = await transactionService.updateStatus(
        id,
        status as TransactionStatus
      );

      res.json({
        message: `Transaction marked as ${status}`,
        transaction: updated,
      });
    } catch (error: any) {
      res
        .status(400)
        .json({ error: error.message || "Failed to update status" });
    }
  },
};
