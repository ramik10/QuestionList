
import mongoose from "mongoose";

const Schema = mongoose.Schema;
const questionSchema = new Schema({
  text: { type: String, required: true },
  upvotes: { type: Number, default: 0 },
});

export  const QUESTION  = mongoose.models.questions || mongoose.model("questions", questionSchema);
