import { Schema, model, Types } from "mongoose";

interface ITest {
    code: string;
    name: string;
    description: string;
    questions: Types.ObjectId[];
    earnedPoints: number;
    maxPoints: number;
}

const TestSchema = new Schema<ITest>({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String },
    questions: [{ type: Types.ObjectId, ref: "Question" }],
    earnedPoints: { type: Number, default: 0 },
    maxPoints: { type: Number, default: 0 },
});

const Test = model<ITest>("Test", TestSchema);

export type { ITest };
export default Test;