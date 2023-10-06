"use client"
import React from "react";

interface QuestionProps {
  question: { _id: string; text: string; upvotes: number };
  onUpvote: (_id: string) => void;
}

const Question: React.FC<QuestionProps> = ({ question, onUpvote }) => {
  const { _id, text, upvotes } = question;

  const handleUpvote = () => {
    onUpvote(_id);
  };

  return (
    <div className="bg-[#00A70B] rounded-lg flex border-2 border-[#ceb992]" >
      <h1 className="text-[#ceb992] font-bold text-xl w-4/6 break-all ml-2" >{text}</h1>
      <button className="bg-[#731dd8] rounded-full p-1 w-2/6 max-h-10 m-auto text-[#c4f1be]" onClick={handleUpvote}>Upvote ({upvotes})</button>
    </div>
  );
};

export default Question;
