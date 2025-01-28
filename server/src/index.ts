// src/app.ts
import express, { Express, Request, Response } from "express";
import { exec } from "child_process";

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from Express + TypeScript!" });
});

app.post("/run-deepSeek", (req: Request, res: Response) => {
  const command = "echo 'hello world'";

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log("Error: ", error);
      return res
        .status(500)
        .json({ success: false, message: "Failed to execute the command" });
    }
    if (stderr) {
      console.log("Stderr: ", stderr);
      return res.status(500).json({
        success: false,
        message: "Failed to execute the command, stderr occurred",
      });
    }
    res.json({
      success: true,
      message: "Command executed successfully",
      stdout,
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
