import User from "../model/User.js";
import { Secret, verify } from "jsonwebtoken";
import { Request, Response } from "express";
import pkg from "jsonwebtoken";
import { HTTP_STATUS } from "../config/httpStatusCodes.js";

const { sign } = pkg;

const handleRefreshToken = async (req: Request, res: Response) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(HTTP_STATUS.UNAUTHORIZED);
    const refreshToken = cookies.jwt;
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });

    const foundUser = await User.findOne({ refreshToken }).exec();

    if (!foundUser) {
        verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET as Secret,
            async (err: any, decoded: any) => {
                if (err) return res.sendStatus(HTTP_STATUS.FORBIDDEN);
                const hackedUser = await User.findOne({
                    username: decoded.username,
                }).exec();
                hackedUser!.refreshToken = [];
                const result = await hackedUser!.save();
            }
        );
        return res.sendStatus(HTTP_STATUS.Forbidden);
    }

    const newRefreshTokenArray = foundUser.refreshToken.filter(
        (rt) => rt !== refreshToken
    );

    // evaluate jwt
    verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as Secret,
        async (err: any, decoded: any) => {
            if (err) {
                foundUser.refreshToken = [...newRefreshTokenArray];
                const result = await foundUser.save();
            }
            if (err || foundUser.username !== decoded.username)
                return res.sendStatus(HTTP_STATUS.FORBIDDEN);

            const roles = Object.values(foundUser.roles);
            const accessToken = sign(
                {
                    UserInfo: {
                        username: decoded.username,
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
            foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
            const result = await foundUser.save();

            res.cookie("jwt", newRefreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 24 * 60 * 60 * 1000,
            });

            res.json({ accessToken });
        }
    );
};

export { handleRefreshToken };
