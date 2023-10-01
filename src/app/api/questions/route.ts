import { NextRequest, NextResponse } from "next/server";
import {QUESTION} from "../../../Db/model";
import { DbConnect } from "@/Db/Db";

DbConnect();
export async function GET(req: NextRequest, res: NextResponse){
    try {
    const questions = await QUESTION.find();
    return NextResponse.json(questions, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest, res: NextResponse){
    try {
    const { text } = await req.json();
    const newQuestion = new QUESTION({ text });
      await newQuestion.save();
    return NextResponse.json(newQuestion,{ status: 201 });
    }
    catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }

  export async function DELETE(req: NextRequest, res: NextResponse){
    try {
    const { id } =await req.json();
    await QUESTION.deleteOne({ _id: id })

    return NextResponse.json({ status: 204 });
    }
    catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }