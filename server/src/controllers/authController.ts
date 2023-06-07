import User from "../model/User.js";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { Secret } from "jsonwebtoken";
import pkg from "jsonwebtoken";
import { HTTP_STATUS } from "../config/httpStatusCodes.js";
const { sign } = pkg;

const handleLogin = async (req: Request, res: Response) => {
    const cookies = req.cookies;

    const { user, pwd } = req.body;
    if (!user || !pwd)
        return res
            .status(HTTP_STATUS.BAD_REQUEST)
            .json({ message: "Username and password are required." });

    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) return res.sendStatus(HTTP_STATUS.UNAUTHORIZED);
    const match = await bcrypt.compare(pwd, foundUser.password);

    if (!match) res.sendStatus(HTTP_STATUS.UNAUTHORIZED);

    const roles = Object.values(foundUser.roles).filter(Boolean);
    const accessToken = sign(
        {
            UserInfo: {
                username: foundUser.username,
                roles: roles,
            },
        },
        process.env.ACCESS_TOKEN_SECRET as Secret,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
    );
    const newRefreshToken = sign(
        { username: foundUser.username },
        process.env.REFRESH_TOKEN_SECRET as Secret,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
    );

    let newRefreshTokenArray = !cookies?.jwt
        ? foundUser.refreshToken
        : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt);

    if (cookies?.jwt) {
        const refreshToken = cookies.jwt;
        const foundToken = await User.findOne({ refreshToken }).exec();

        if (!foundToken) {
            newRefreshTokenArray = [];
        }

        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
    }

    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    const result = await foundUser.save();

    res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
};

export { handleLogin };
