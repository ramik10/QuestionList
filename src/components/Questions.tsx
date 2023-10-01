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
    <div>
      <p>{text}</p>
      <button onClick={handleUpvote}>Upvote ({upvotes})</button>
    </div>
  );
};

export default Question;
