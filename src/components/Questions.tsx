"use client"
import React from "react";

interface QuestionProps {
  question: { id: number; text: string; upvotes: number };
  onUpvote: (id: number) => void;
}

const Question: React.FC<QuestionProps> = ({ question, onUpvote }) => {
  const { id, text, upvotes } = question;

  const handleUpvote = () => {
    onUpvote(id);
  };

  return (
    <div>
      <p>{text}</p>
      <button onClick={handleUpvote}>Upvote ({upvotes})</button>
    </div>
  );
};

export default Question;
