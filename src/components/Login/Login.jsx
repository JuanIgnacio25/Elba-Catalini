"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { status, data: session } = useSession();
  const searchParams = useSearchParams();

  useEffect(() => {
    const errorMessage = searchParams.get("error");
    if (errorMessage) {
      setError(errorMessage);
    } else {
      setError("");
    }
  }, [searchParams]);

  useEffect(() => {
    if (status === "authenticated") {
      let callbackUrl = searchParams.get("callbackUrl") || "/";

      if (callbackUrl.startsWith("/cart/")) {
        callbackUrl = `/cart/${session.user.cartId}`;
      }
      window.location.assign(callbackUrl);
    }
  }, [status, session, router, searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const nextAuthResponse = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (!nextAuthResponse.ok) return setError(nextAuthResponse.error);

    /*  if (nextAuthResponse.ok) {
      let callbackUrl = searchParams.get("callbackUrl") || "/";
      console.log(nextAuthResponse);
      console.log(session);
      if(callbackUrl.startsWith("/cart/")){
        callbackUrl = `/cart/${session.user.cartId}`
      }
      
      window.location.assign(callbackUrl);
    } */
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="text-black" id="login-form">
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Usuario@gmail.com"
          name="email"
          autoComplete="email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="********"
          name="password"
          autoComplete="current-password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button className="bg-white">Login</button>
      </form>
    </div>
  );
}

export default Login;