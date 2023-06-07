import { Secret, verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const verifyJWT = (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization! || req.headers.Authorization!;

    if (!(authHeader as string)?.startsWith("Bearer "))
        return res.sendStatus(401);

    const token = (authHeader as string).split(" ")[1];

    console.log(token);
    verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as Secret,
        (err: any, decoded: any) => {
            if (err) return res.sendStatus(403);

            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;

            next();
        }
    );
};

export default verifyJWT;
