import { Router } from "express";
import { listModels, modelInfo } from "../controllers/model.controller";

const router = Router();

router.route("/listModels").get(listModels);
router.route("/modelInfo/:name").get(modelInfo);

export default router;
