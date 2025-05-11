import "@/config/passport";
import errorMiddleware from "@/middleware/errorMiddleware";
import authRoutes from "@/routes/authRoutes";
import productRoutes from "@/routes/productRoutes";
import express, { type Application } from "express";
import helmet from "helmet";
import http from "http";

export const app: Application = express();

app.use(helmet());

app.use(express.json());

app.use(authRoutes);
app.use(productRoutes);

app.use(errorMiddleware);

const server = http.createServer(app);

export default server;
