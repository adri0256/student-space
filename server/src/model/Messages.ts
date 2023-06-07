import { Schema, model, Types } from "mongoose";

interface IMessage {
    message: string;
    sender: Types.ObjectId;
}

const MessageSchema = new Schema<IMessage>({
    message: { type: String, required: true },
    sender: [{ type: Types.ObjectId, ref: "User" }],
});

const Message = model<IMessage>("Message", MessageSchema);

export type { IMessage };
export default Message;