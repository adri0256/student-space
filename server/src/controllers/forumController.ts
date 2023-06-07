import { Request, Response } from 'express';
import Forum from '../model/Forum.js';

const handleGetForum = async (req: Request, res: Response) => {
    const forum = await Forum.find().exec();
    res.json(forum);
}