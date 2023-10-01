import { NextRequest, NextResponse } from "next/server";

let questions: { id: number; text: string; upvotes: number }[] = [];

export async function GET(req: NextRequest, res: NextResponse){
    return NextResponse.json(questions, { status: 200 });
}

export async function POST(req: NextRequest, res: NextResponse){
    const { text } = await req.json();
    const newQuestion = { id: questions.length + 1, text, upvotes: 0 };
    questions.push(newQuestion);

    return NextResponse.json(newQuestion,{ status: 201 });
  }

  export async function DELETE(req: NextRequest, res: NextResponse){
    const { id } =await req.json();
    questions = questions.filter((q) => q.id !== id);

    return NextResponse.json({ status: 204 });
  }