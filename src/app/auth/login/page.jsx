
import { Suspense } from "react";
import Login from "@/components/Login/Login";

function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Login/>
    </Suspense>
  );
}

export default LoginPage;