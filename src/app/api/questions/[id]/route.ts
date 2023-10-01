import { NextRequest, NextResponse } from "next/server";

let questions: { id: number; text: string; upvotes: number }[] = [];

export async function POST(req: NextRequest, {params}:{params: { id: string }}){
    const  id  = params.id;

    const question = questions.find((q) => q.id === parseInt(id as string, 10));

    if (!question) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 });
    }

    question.upvotes += 1;

    return NextResponse.json(question,{ status: 200 });
  }