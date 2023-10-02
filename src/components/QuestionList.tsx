"use client"
import React, { useState, useEffect } from "react";
import Question from "./Questions";
import { useRecoilValue } from "recoil";
import { usernameState, passwordState } from "../atoms/credentials";

interface QuestionListProps {}

const QuestionList: React.FC<QuestionListProps> = () => {
  const [questions, setQuestions] = useState<{ _id: string; text: string; upvotes: number }[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const username = useRecoilValue(usernameState);
  const password = useRecoilValue(passwordState);

  useEffect(() => {
    setInterval(() => {
    fetch("/api/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data));
    }, 300);
  }, []);

  const handleAddQuestion = () => {
    if (username !== process.env.NEXT_PUBLIC_ID || password !== process.env.NEXT_PUBLIC_PASSWORD) {
      alert("Not an admin");
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

  const handleUpvote = (id: string) => {
    fetch(`/api/questions/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        const updatedQuestions = questions.map((q) =>
          q._id === id ? { ...q, upvotes: q.upvotes + 1 } : q
        );
        setQuestions(updatedQuestions);
      });
  };

  const handleDeleteQuestion = (id: string) => {
    if (username !== process.env.NEXT_PUBLIC_ID || password !== process.env.NEXT_PUBLIC_PASSWORD) {
      alert("Not an admin");
      return;
    }
    fetch("/api/questions", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then(() => {
        setQuestions(questions.filter((q) => q._id !== id));
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
          <div key={question._id}>
            <Question question={question} onUpvote={handleUpvote} />
            <button onClick={() => handleDeleteQuestion(question._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionList;
