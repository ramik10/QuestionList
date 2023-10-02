"use client"
import React, { useState, useEffect } from "react";
import Question from "./Questions";
import { useSession } from "next-auth/react";


interface QuestionListProps {
  userId: string; 
}

const QuestionList: React.FC<QuestionListProps> = ({ userId }) => {
  const [questions, setQuestions] = useState<{ _id: string; text: string; upvotes: number }[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const session = useSession();
  useEffect(() => {
    setInterval(() => {
    fetch("/api/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data));
    }, 300);
  }, []);

  const handleAddQuestion = () => {
    if(session.data?.user?.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL){
      alert("You are not authorized to add questions)");
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
    if(!session.data){
      alert("Login to upvote questions)");
      return;
    }
    fetch(`/api/questions/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }), 
    })
      .then(() => {
        const updatedQuestions = questions.map((q) =>
          q._id === id ? { ...q, upvotes: q.upvotes + 1 } : q
        );
        setQuestions(updatedQuestions);
      });
  };

  const handleDeleteQuestion = (id: string) => {
    if(session.data?.user?.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL){
      alert("You are not authorized to delete questions)");
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
