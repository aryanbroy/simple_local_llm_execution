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

export const modelInfo = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const response = await fetch(`${OLLAMA_API_URL}/show`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    });
    const data = await response.json();
    if (data.error) {
      res.status(404).json({
        success: false,
        message: "Model not found",
        error: data.error,
      });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: `Model info for ${name}`, data });
    return;
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching model info" });
    return;
  }
};

export const generateResponse = async (req: Request, res: Response) => {
  try {
    const { model, prompt } = req.body;

    if (!model || !prompt) {
      res
        .status(400)
        .json({ success: false, message: "Model or prompt is missing" });
      return;
    }
    const response = await fetch(`${OLLAMA_API_URL}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model, prompt, stream: false }),
    });
    const data = await response.json();
    res
      .status(200)
      .json({ success: true, message: "Response generated", data });
    return;
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error generating response" });
  }
};