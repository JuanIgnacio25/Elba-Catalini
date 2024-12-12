"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams} from "next/navigation";
import { useSession} from "next-auth/react";
import Link from "next/link";

function LoginMain() {
  const router = useRouter();
  const { status, data: session } = useSession();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
  };

  return (
    <div className="login-main-container">
      <h1 className="login-main-title">Iniciar Sesion</h1>
      <form className="login-main-data-container" onSubmit={handleSubmit}>
        <div className="login-main-data">
          <p>Correo Electronico</p>
          <input
            type="email"
            placeholder="Usuario@gmail.com"
            name="email"
            autoComplete="email"
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="login-main-data">
          <p>Contraseña</p>
          <input
            type="password"
            placeholder="********"
            name="password"
            autoComplete="current-password"
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="login-main-error">{error}</div>}
        <div className="login-main-forgotpassword">
          <Link href="/auth/password-recovery">¿Olvidaste la contraseña?</Link>
          <p></p>
        </div>
        <div className="login-main-button-container">
          <button className="login-main-button">Iniciar Sesion</button>
        </div>
      </form>
      <div className="login-have-account">
          <p>
            No tenes una cuenta?{" "}
            <Link href={"/auth/register"} className="login-have-account-redirect">Registrarse</Link>
          </p>
        </div>
    </div>
  );
}

export default LoginMain;
