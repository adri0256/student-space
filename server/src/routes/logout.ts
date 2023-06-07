import { Router } from "express";
import { handleLogout } from "../controllers/logoutController.js";

const logoutRouter = Router();

logoutRouter.post("/", handleLogout);

export default logoutRouter;
