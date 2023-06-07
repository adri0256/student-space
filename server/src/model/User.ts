import { Schema, model, connect, Types } from "mongoose";

interface IUser {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    roles: Types.ObjectId[];
    refreshToken: string[];
}

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    avatar: { type: String },
    roles: {
        User: {
            type: Number,
            default: 2001,
        },
        Teacher: Number,
        Admin: Number,
    },
    refreshToken: [{ type: String }],
});

const User = model<IUser>("User", UserSchema);

export type { IUser };
export default User;
