import { Router, Request, Response } from "express";
import path from "path";

const rootRouter = Router();

rootRouter.get("^/$|/index(.html)?", (req: Request, res: Response) => {
    res.sendFile(path.join(path.resolve(), "views", "index.html"));
});

export default rootRouter;
