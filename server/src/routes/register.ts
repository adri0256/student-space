import { Router } from "express";
import { handleNewUser } from "../controllers/registerController.js";

const registerRouter = Router();

registerRouter.post("/", handleNewUser);

export default registerRouter;
