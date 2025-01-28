import { Router } from "express";
import { listModels } from "../controllers/model.controller";

const router = Router();

router.route("/listModels").get(listModels);

export default router;
