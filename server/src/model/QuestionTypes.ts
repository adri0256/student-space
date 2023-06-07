import { Schema, model, Types } from "mongoose";

interface IQuestionType {
    code: string;
    name: string;
    description: string;
}

const questionTypesSchema = new Schema<IQuestionType>({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String },
});

const QuestionType = model<IQuestionType>("Test", questionTypesSchema);

export type { IQuestionType };
export default QuestionType;