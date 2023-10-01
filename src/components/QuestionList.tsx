"use client"
import React, { useState, useEffect } from "react";
import Question from "./Questions";
import { usernameState, passwordState } from "../atoms/credentials";
import { useRecoilValue } from "recoil";

interface QuestionListProps {}

const QuestionList: React.FC<QuestionListProps> = () => {
  const [questions, setQuestions] = useState<{ id: number; text: string; upvotes: number }[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const username = useRecoilValue(usernameState);
  const password = useRecoilValue(passwordState);

  useEffect(() => {
    fetch("/api/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  const handleAddQuestion = () => {
    if (username !== process.env.NEXT_PUBLIC_ID || password !== process.env.NEXT_PUBLIC_PASSWORD) {
      alert("You are not admin");
      return;
    }
    if (newQuestion.trim() === "") return;
    fetch("/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: newQuestion }),
    })
      .then((response) => response.json())
      .then((data) => {
        setQuestions([...questions, data]);
        setNewQuestion("");
      });
  };

  const handleUpvote = (id: number) => {
    fetch(`/api/questions/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        const updatedQuestions = questions.map((q) =>
          q.id === id ? { ...q, upvotes: q.upvotes + 1 } : q
        );
        setQuestions(updatedQuestions);
      });
  };

  const handleDeleteQuestion = (id: number) => {
    fetch("/api/questions", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then(() => {
        setQuestions(questions.filter((q) => q.id !== id));
      });
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <div>
        <input
          type="text"
          placeholder="Add a question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <button onClick={handleAddQuestion}>Add</button>
      </div>
      <div>
        {questions.map((question) => (
          <div key={question.id}>
            <Question question={question} onUpvote={handleUpvote} />
            <button onClick={() => handleDeleteQuestion(question.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionList;