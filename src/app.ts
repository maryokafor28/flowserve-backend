import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "FlowServe API running..." });
});

export default app;
