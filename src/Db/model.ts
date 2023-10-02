
import mongoose from "mongoose";

const Schema = mongoose.Schema;
const questionSchema = new Schema({
  text: { type: String, required: true },
  upvotes: { type: Number, default: 0 },
});
const userUpvoteSchema = new Schema({
  userId: { type: String, required: true },
  questionId: { type: String, required: true },
});

export  const QUESTION  = mongoose.models.questions || mongoose.model("questions", questionSchema);
export  const UserUpvoteModel = mongoose.models.userupvotes || mongoose.model("userupvotes", userUpvoteSchema);