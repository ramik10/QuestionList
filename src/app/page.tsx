"use client"
import QuestionList from "@/components/QuestionList";
import {useSession} from "next-auth/react";
import {signIn , signOut} from "next-auth/react";



export default function Home() {
  return (
      <LandingPage />
  )
}

function LandingPage() {
  const session = useSession();
return (<>
    {!session.data && <div className="flex justify-center pt-2">
      <button className="px-4 py-2 bg-[#65E66D] border flex gap-2 border-slate-400 rounded-lg text-slate-700 hover:border-slate-700 hover:text-slate-900 hover:shadow transition duration-150" onClick={() => {
        signIn("google")
      }}><img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
      <span>Login with Google</span></button>
    </div>}
    {session.data && <div className="flex justify-center pt-2">
      <button className="bg-[#731dd8] px-4 py-2 rounded-full p-1 text-[#c4f1be]" onClick={()=>{signOut()}} >Logout</button>
    </div>}
   <QuestionList userId={session.data?.user?.email || ""} />
  </>
  )
}
