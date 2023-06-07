import { Router } from "express";
import { handleRefreshToken } from "../controllers/refreshTokenController.js";

const refreshRouter = Router();

refreshRouter.get("/", handleRefreshToken);

export default refreshRouter;
