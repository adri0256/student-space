import User from "../model/User.js";
import { IUser } from "../model/User.js";
import { Request, Response } from "express";
import { HTTP_STATUS } from "../config/httpStatusCodes.js";

const handleLogout = async (req: Request, res: Response) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(HTTP_STATUS.NO_CONTENT);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
        return res.sendStatus(HTTP_STATUS.NO_CONTENT);
    }

    foundUser.refreshToken = foundUser.refreshToken.filter(
        (token) => token !== refreshToken
    );
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    res.sendStatus(HTTP_STATUS.NO_CONTENT);
};

export { handleLogout };
