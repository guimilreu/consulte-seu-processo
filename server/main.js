import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { connectDB } from "./lib/db.js";
import { validateEnv } from "./lib/env.js";
import authRoutes from "./routes/authRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import processRoutes from "./routes/processRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV === "production") {
	app.set("trust proxy", 1);
}

app.use(helmet());
app.use(
	cors({
		origin: process.env.FRONTEND_URL || "http://localhost:3000",
		credentials: true,
	})
);
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 20,
	standardHeaders: true,
	legacyHeaders: false,
	message: { error: "Muitas tentativas. Tente novamente em 15 minutos." },
});

app.use("/api/auth/login", authLimiter);
app.use("/api/auth/setup-password", authLimiter);

app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/processes", processRoutes);
app.use("/api/users", userRoutes);

app.get("/health", async (req, res) => {
	const dbState = mongoose.connection.readyState;
	const dbOk = dbState === 1;

	res.status(dbOk ? 200 : 503).json({
		status: dbOk ? "ok" : "degraded",
		database: dbOk ? "connected" : "disconnected",
	});
});

app.use(notFoundHandler);
app.use(errorHandler);

connectDB().then(() => {
	app.listen(PORT, () => {
		console.log(`Servidor rodando na porta ${PORT}`);
	});
});

process.on("unhandledRejection", (reason) => {
	console.error("Unhandled Rejection:", reason);
});

process.on("uncaughtException", (error) => {
	console.error("Uncaught Exception:", error);
	process.exit(1);
});
