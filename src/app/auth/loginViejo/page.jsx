
import { Suspense } from "react";
import LoginViejo from "@/components/views/auth/Login/LoginViejo";

function LoginViejoPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginViejo/>
    </Suspense>
  );
}

export default LoginViejoPage;