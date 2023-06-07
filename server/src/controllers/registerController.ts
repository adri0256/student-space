import User from "../model/User.js";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { HTTP_STATUS } from "../config/httpStatusCodes.js";

const handleNewUser = async (req: Request, res: Response) => {
    const { user, pwd, lastName, firstName, email } = req.body;
    if (!user || !pwd)
        return res
            .status(HTTP_STATUS.BAD_REQUEST)
            .json({ message: "Username and password are required." });

    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) return res.sendStatus(HTTP_STATUS.CONFLICT);

    try {
        const hashedPwd = await bcrypt.hash(pwd, 10);

        const result = await User.create({
            username: user,
            password: hashedPwd,
            email: email,
            firstName: firstName,
            lastName: lastName,
        });

        console.log(result);

        res.status(HTTP_STATUS.CREATED).json({
            success: `New user ${user} created!`,
        });
    } catch (err: any) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: err.message,
        });
    }
};

export { handleNewUser };
