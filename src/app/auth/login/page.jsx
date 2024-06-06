"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const router = useRouter();

  const { status, data: session } = useSession();

  useEffect(() => {
    setError("");
    const params = new URLSearchParams(window.location.search);
    const errorMessage = params.get("error");
    if (errorMessage) {
      setError(errorMessage);
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      const params = new URLSearchParams(window.location.search);
      const callbackUrl = params.get("callbackUrl") || "/";
      router.push(callbackUrl);
    }
  }, [status, session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    console.log({userFront: email , password , callbackUrl: `${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}auth/login`})

    const nextAuthResponse = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
      callbackUrl: `${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}auth/login`
    });

    console.log(nextAuthResponse);

    if (!nextAuthResponse.ok) return setError(nextAuthResponse.error);

    if (nextAuthResponse.ok) {
      const params = new URLSearchParams(window.location.search);
      const callbackUrl = params.get("callbackUrl") || "/";
      /* router.push(callbackUrl);
      router.refresh(); */
      window.location.assign(callbackUrl);
    }
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

export default LoginPage;