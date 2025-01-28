// src/app.ts
import express, { Express, Request, Response } from "express";
import modelRouter from "./routes/models.route";

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(express.json());

export const OLLAMA_API_URL = "http://localhost:11434/api";

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from Express + TypeScript!" });
});

app.use("/api/models", modelRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
