import { Schema, model, Types } from "mongoose";

interface IQuestion {
    question: string;
    answers: string[];
    correctAnswer: number;
    points: number;
    type: Types.ObjectId;
}

const QuestionSchema = new Schema<IQuestion>({
    question: { type: String, required: true },
    answers: [{ type: String, required: true }],
    correctAnswer: { type: Number, required: true },
    points: { type: Number, required: true },
    type: [{ type: Types.ObjectId, ref: "Test" }],
});

const Question = model<IQuestion>("Question", QuestionSchema);

export type { IQuestion };
export default Question;