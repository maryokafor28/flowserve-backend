import express from "express";
import cors from "cors";
import { apiLimiter } from "./middlewares/rateLimiter";
import { requestLogger } from "./middlewares/requestLogger";
import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

// Log all incoming requests
app.use(requestLogger);

// Routes
app.use("/api", apiLimiter);
app.use("/api/users", userRoutes);

// Basic health route
app.get("/", (_, res) => res.json({ message: "FlowServe API running 🚀" }));
app.use(errorHandler);

export default app;
