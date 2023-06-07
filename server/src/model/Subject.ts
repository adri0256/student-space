import { Schema, model, Types } from "mongoose";

interface ISubject {
    code: string;
    name: string;
    description: string;
    teacher: Types.ObjectId;
    students: Types.ObjectId[];
    lessons: Types.ObjectId[];
    forum: Types.ObjectId;
    tests: Types.ObjectId[];
}

const SubjectSchema = new Schema<ISubject>({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String },
    teacher: [{ type: Types.ObjectId, ref: "User" }],
    students: [{ type: Types.ObjectId, ref: "User" }],
    lessons: [{ type: Types.ObjectId, ref: "Lesson" }],
    forum: [{ type: Types.ObjectId, ref: "Forum" }],
    tests: [{ type: Types.ObjectId, ref: "Test" }],
});

const Subject = model<ISubject>("Subject", SubjectSchema);

export type { ISubject };
export default Subject;