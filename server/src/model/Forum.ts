import { Schema, model, Types } from "mongoose";

interface IForum {
    name: string;
    description: string;
    messages: Types.ObjectId[];
}

const ForumSchema = new Schema<IForum>({
    name: { type: String, required: true },
    description: { type: String },
    messages: [{ type: Types.ObjectId, ref: "Message" }],
});

const Forum = model<IForum>("Forum", ForumSchema);

export type { IForum };
export default Forum;