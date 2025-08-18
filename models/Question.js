import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        yt_link:{type: String, trim: true},
        p1_link:{type: String, trim: true},
        p2_link:{type: String, trim: true},
    }
});
const Question = mongoose.model("Question", questionSchema, "questions");

export default Question;
export{Question};

