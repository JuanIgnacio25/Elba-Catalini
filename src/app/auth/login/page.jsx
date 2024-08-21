
import { Suspense } from "react";
import Login from "@/components/views/auth/Login/Login";

function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Login/>
    </Suspense>
  );
}

export default LoginPage;