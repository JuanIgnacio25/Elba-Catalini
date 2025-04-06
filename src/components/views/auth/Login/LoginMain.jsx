"use client";

import { useState, useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { useCart } from "@/context/CartContext";

import axios from "axios";

import { ImSpinner8 } from "react-icons/im";

function LoginMain() {
  const router = useRouter();
  const { status, data: session } = useSession();
  const searchParams = useSearchParams();

  const { fetchCart } = useCart();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const errorMessage = searchParams.get("error");
    if (errorMessage) {
      setError(errorMessage);
    } else {
      setError("");
    }
  }, [searchParams]);

  /* useEffect(() => {
    if (status === "authenticated") {
      let callbackUrl = searchParams.get("callbackUrl") || "/";
      window.location.assign(callbackUrl);
    }
  }, [status, session, router, searchParams]); */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const nextAuthResponse = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });
      if (!nextAuthResponse.ok) throw nextAuthResponse.error;

      const storedCart = localStorage.getItem("cart");
      const localCart = storedCart ? JSON.parse(storedCart) : [];

      await axios.patch("/api/carts", { localCart });

      localStorage.setItem("cart", []);
      await fetchCart();


      let callbackUrl = searchParams.get("callbackUrl") || "/";
      window.location.assign(callbackUrl);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-[88%] ">
      <h1 className="w-[80%] text-center pb-2 text-xl md:text-2xl font-bold text-gray-800 border-b">
        Ingresá a tu cuenta
      </h1>
      <form
        className="w-full max-w-md bg-white p-2 rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700">
            Correo Electrónico
          </label>
          <input
            type="email"
            placeholder="Usuario@gmail.com"
            autoComplete="username"
            className="w-full mt-1 p-1 md:p-2 placeholder:text-sm lg:placeholder:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 bg-gray-100"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            placeholder="********"
            autoComplete="current-password"
            className="w-full mt-1 p-1 md:p-2 placeholder:text-sm lg:placeholder:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 bg-gray-100"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 text-xs sm:text-sm font-semibold rounded-md">
            {error}
          </div>
        )}
        <div className="text-right text-sm text-red-500 hover:text-red-700">
          <Link href="/auth/password-recovery">¿Olvidaste la contraseña?</Link>
        </div>
        <div className="flex justify-center mt-4">
          {loading ? (
            <button className="w-28 md:w-36 h-7 md:h-9 bg-red-700 text-white font-bold rounded-lg flex items-center justify-center">
              <ImSpinner8 className="animate-spin w-5 h-5" />
            </button>
          ) : (
            <button className="w-28 md:w-36 h-7 md:h-9 bg-red-700 hover:bg-red-900 text-sm md:text-base text-white font-bold rounded-lg focus:outline-none">
              Ingresar
            </button>
          )}
        </div>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        ¿No tenes una cuenta?{" "}
        <Link
          href="/auth/register"
          className="text-red-500 hover:text-red-700 font-bold"
        >
          Registrarse
        </Link>
      </p>
    </div>
  );
}

export default LoginMain;
