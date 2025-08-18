import mongoose from "mongoose";
import Question from "./Question.js";

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true      
    },
    sl_no: {
        type: Number,
        required: true,
        unique: true
    },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
});

export const Category = mongoose.model("Category", categorySchema, "categories");