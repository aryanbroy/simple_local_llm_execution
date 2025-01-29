import { Router } from "express";
import {
  generateResponse,
  listModels,
  modelInfo,
} from "../controllers/model.controller";

const router = Router();

router.route("/listModels").get(listModels);
router.route("/modelInfo/:name").get(modelInfo);
router.route("/generateResponse").post(generateResponse);

export default router;
