"use client"
import QuestionList from "@/components/QuestionList";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { usernameState, passwordState } from "../atoms/credentials";



export default function Home() {
  return (
    <RecoilRoot>
      <LandingPage />
    </RecoilRoot>
  )
}

function LandingPage() {
  const setUsername = useSetRecoilState(usernameState);
  const setPassword = useSetRecoilState(passwordState);
  const username = useRecoilValue(usernameState);
  const password = useRecoilValue(passwordState);
return (<>
    <div style={{border:"1px", borderBlockColor:"black"}}>
      <input type="text" placeholder="username"  onChange={(e)=>setUsername(e.target.value)} />
      <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
      <button onClick={() => {
        if (username === process.env.NEXT_PUBLIC_ID && password === process.env.NEXT_PUBLIC_PASSWORD) {
          alert("Login successful");
        }
      }}>Login</button>
    </div>
   <QuestionList />
  </>
  )
}
