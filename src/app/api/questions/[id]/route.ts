import { NextRequest, NextResponse } from "next/server";
import { DbConnect } from "@/Db/Db";
import { QUESTION } from "@/Db/model";

DbConnect();

export async function POST(req: NextRequest, {params}:{params: { id: string }}){
    const  id  = params.id;

    try {
        const question = await QUESTION.findById(id);
  
        if (!question) {
          return NextResponse.json({ error: "Question not found" }, { status: 404 });
        }
  
        question.upvotes += 1;
  
        await question.save();
  
        return NextResponse.json(question, { status: 200 });
      } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500});
      }
  }