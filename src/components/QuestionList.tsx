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
    <div className="pt-3">
      <h1 className="text-5xl font-bold flex justify-center">Admin Panel</h1>
      <div className="flex justify-center pt-2">
        <input className="border-2 border-[#731dd8] rounded-full p-1 bg-lime-600 placeholder-black"
          type="text"
          placeholder="Add a question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <button className="bg-[#731dd8] rounded-full px-2 py-1 text-[#c4f1be]" onClick={handleAddQuestion}>Add</button>
      </div>
      <div className="grid grid-cols-12 gap-6 ml-5 mr-5 pt-5">
        {questions.map((question) => (
          <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"   key={question._id}>
            <Question  question={question} onUpvote={handleUpvote} />
            <div className="flex justify-center pt-1">
            <button className="bg-[#731dd8] rounded-full px-2 py-1 text-[#c4f1be]" onClick={() => handleDeleteQuestion(question._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      </div>
  );
};

export default QuestionList;
