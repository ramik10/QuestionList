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
    {!session.data && <div >
      <button onClick={() => {
        signIn("google")
      }}>Login</button>
    </div>}
    {session.data && <div >
      <button onClick={()=>{signOut()}} >Logout</button>
    </div>}
   <QuestionList userId={session.data?.user?.email || ""} />
  </>
  )
}
