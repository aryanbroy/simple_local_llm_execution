import { Request, Response } from "express";
import { OLLAMA_API_URL } from "..";

export const listModels = async (req: Request, res: Response) => {
  try {
    const response = await fetch(`${OLLAMA_API_URL}/tags`);
    const data = await response.json();
    res.status(200).json({ success: true, data });
    return;
  } catch (error) {
    res.status(404).json({ success: false, message: "Error fetching models" });
    return;
  }
};
