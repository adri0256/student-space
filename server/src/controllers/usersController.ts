import { HTTP_STATUS } from "../config/httpStatusCodes.js";
import User from "../model/User.js";
import { Request, Response } from "express";

const getAllUsers = async (req: Request, res: Response) => {
    const users = await User.find();

    if (!users)
        return res
            .status(HTTP_STATUS.NO_CONTENT)
            .json({ message: "No users found" });

    res.json(users);
};

const deleteUser = async (req: Request, res: Response) => {
    if (!req?.body?.id)
        return res
            .status(HTTP_STATUS.BAD_REQUEST)
            .json({ message: "User ID required" });

    const user = await User.findOne({ _id: req.body.id }).exec();

    if (!user) {
        return res
            .status(204)
            .json({ message: `User ID ${req.body.id} not found` });
    }

    const result = await user.deleteOne({ _id: req.body.id });

    res.json(result);
};

const getUser = async (req: Request, res: Response) => {
    if (!req?.params?.id)
        return res
            .status(HTTP_STATUS.BAD_REQUEST)
            .json({ message: "User ID required" });

    const user = await User.findOne({ _id: req.params.id }).exec();

    if (!user) {
        return res
            .status(HTTP_STATUS.NO_CONTENT)
            .json({ message: `User ID ${req.params.id} not found` });
    }

    res.json(user);
};

const updateUser = async (req: Request, res: Response) => {
    if (!req?.body?.id)
        return res
            .status(HTTP_STATUS.BAD_REQUEST)
            .json({ message: "User ID required" });

    const user = await User.findOne({ _id: req.body.id }).exec();

    if (!user) {
        return res
            .status(HTTP_STATUS.NO_CONTENT)
            .json({ message: `User ID ${req.body.id} not found` });
    }

    const newUser = new User({
        _id: req.body.id,
        username: req.body.username,
        password: req.body.password,
        roles: req.body.roles,
    });

    const result = await user.updateOne(newUser);

    res.json(result);
};

export { getAllUsers, deleteUser, getUser, updateUser };
