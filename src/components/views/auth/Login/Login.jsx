import LoginMain from "@/components/views/auth/Login/LoginMain"
import LoginMainFallback from "@/components/Fallbacks/LoginMainFallback";
import "./login.css"

import { Suspense } from "react";

function Login() {
  return (
    <div className="login-container">
      <div className="login">
        <div className="login-side login-side-left"></div>
        <Suspense fallback={<LoginMainFallback/>}>
         <LoginMain/>
        </Suspense>
        <div className="login-side login-side-right"></div>
      </div>
    </div>
  )
}

export default Login