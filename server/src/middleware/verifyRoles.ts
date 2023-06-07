import { Request, Response, NextFunction } from "express";

interface RequestWithUser extends Request {
    user: string;
    roles: string[];
}

const verifyRoles = (...allowedRoles: any[]) => {
    return (req: any, res: any, next: NextFunction) => {
        if (!req?.roles) return res.sendStatus(401);

        const rolesArray = [...allowedRoles];
        const result = req.roles
            .map((role: any) => rolesArray.includes(role))
            .find((val: boolean) => val === true);

        if (!result) return res.sendStatus(401);

        next();
    };
};

export default verifyRoles;
