import { NextRequest, NextResponse } from "next/server";
import { DbConnect } from "@/Db/Db";
import { QUESTION } from "@/Db/model";
import { UserUpvoteModel } from "@/Db/model";

DbConnect();

export async function POST(req: NextRequest, {params}:{params: { id: string }}){
    const  id  = params.id;
      try {
          const body = await req.json();
          const userId = body.userId;
          const question = await QUESTION.findById(id);
    
          if (!question) {
            return NextResponse.json({ error: "Question not found" }, { status: 404 });
          }
    
          const existingUpvote = await UserUpvoteModel.findOne({
            userId,
            questionId: id,
          });
    
          if (existingUpvote) {
            return NextResponse.json({ error: "User has already upvoted this question" }, { status: 400 });
          }
    
          question.upvotes += 1;
    
          await question.save();
    
          await UserUpvoteModel.create({
            userId,
            questionId: id,
          });
    
          return NextResponse.json(question,{ status: 200 });
        } catch (error) {
          console.log(error);
          return NextResponse.json({ error: "Internal Server Error" },{ status: 500});
        }
      }