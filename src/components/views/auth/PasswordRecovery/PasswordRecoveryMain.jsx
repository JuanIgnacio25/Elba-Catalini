"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { ImSpinner8 } from "react-icons/im";

function PasswordRecoveryMain() {
  const params = useParams();
  const router = useRouter();
  const token = decodeURIComponent(params.token);

  const [password, setPassword] = useState("");
  const [validatePassword, setValidatePassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    if (success) {
      const countdownInterval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(countdownInterval);
        router.push("/auth/login");
      }, 5000);
    }
  }, [success, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setSuccess("");
      setError("");
      const res = await axios.post("/api/auth/recovery-password", {
        password,
        validatePassword,
        token,
      });
      setSuccess(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error al cambiar la contraseña");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-[84%]  min-h-[30vh] py-4 px-2">
      <h3 className="w-[80%] text-xl sm:text-2xl font-bold text-gray-900 text-center border-b mb-4">
        Ingresá tu nueva contraseña
      </h3>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full bg-white p-2 sm:p-4 rounded-lg"
      >
        <div className="w-[80%] sm:w-[60%] mb-2 sm:mb-4">
          <label className="block text-sm sm:text-base text-gray-700 font-bold mb-1">
            Contraseña
          </label>
          <input
            type="password"
            placeholder="********"
            name="password"
            autoComplete="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-2 sm:px-3 py-1 sm:py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div className="w-[80%] sm:w-[60%] mb-2 sm:mb-4">
          <label className="block text-sm sm:text-base text-gray-700 font-bold mb-1">
            Confirmar Contraseña
          </label>
          <input
            type="password"
            placeholder="********"
            name="validate-password"
            autoComplete="password"
            required
            onChange={(e) => setValidatePassword(e.target.value)}
            className="w-full px-2 sm:px-3 py-1 sm:py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        {error && (
          <div className="w-[80%] sm:w-[60%] bg-red-100 border-l-4 border-red-500 text-red-700 p-2 text-sm font-semibold rounded-md">
            {error}
          </div>
        )}
        {success && (
          <div className="w-[80%] sm:w-[60%] bg-green-100 border-l-4 border-green-500 text-green-700 p-2 text-xs sm:text-sm font-semibold rounded-md shadow-md flex flex-col gap-1">
            <p>{success}</p>
            <p className="text-yellow-700 text-xs sm:text-sm font-medium">
              En {seconds} segundos serás redirigido para iniciar sesión.
            </p>
          </div>
        )}
        {loading ? (
          <button className="w-32 sm:w-36 h-7 sm:h-9 mt-2 bg-red-700 text-white font-bold rounded-lg flex items-center justify-center">
            <ImSpinner8 className="animate-spin w-5 h-5" />
          </button>
        ) : (
          <button className="w-32 sm:w-36 h-7 sm:h-9 mt-2 bg-red-700 hover:bg-red-900 text-sm sm:text-base text-white font-bold rounded-lg focus:outline-none">
            Cambiar
          </button>
        )}
      </form>
    </div>
  );
}

export default PasswordRecoveryMain;
