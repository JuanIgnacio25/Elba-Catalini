import LoginMain from "@/components/views/auth/Login/LoginMain";
import LoginMainFallback from "@/components/Fallbacks/LoginMainFallback";
import { Suspense } from "react";

function Login() {
  return (
    <div className="flex flex-col justify-center items-center h-[55vh] sm:h-[58vh] my-6">
      <div className="flex flex-row flex-wrap justify-start items-center w-full h-full max-w-[95vw] sm:max-w-[85vw] md:max-w-[75vw] lg:max-w-[52vw] bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-[6%] h-full bg-gradient-to-b from-red-500 to-black"></div>
        <Suspense fallback={<LoginMainFallback />}>
          <LoginMain />
        </Suspense>
        <div className="w-[6%] h-full bg-gradient-to-b from-red-500 to-black"></div>
      </div>
    </div>
  );
}

export default Login;
