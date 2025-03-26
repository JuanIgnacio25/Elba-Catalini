"use client";

import axios from "axios";
import { useState } from "react";

import { ImSpinner8 } from "react-icons/im";

function SendRecoveryTokenMain() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setSent("");
      setError("");
      const res = await axios.post(`/api/auth/send-recovery-token`, { email });
      setSent(`Se envió un link de recuperación a ${res.data}`);
    } catch (err) {
      setError(err.response?.data?.message || "Error al enviar el token");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full my-24">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full max-w-[90%] sm:max-w-[80%] lg:max-w-[70%] bg-white p-2 lg:p-4"
      >
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-4">
          Ingrese su correo electrónico
        </h3>
        <input
          type="email"
          placeholder="Usuario@gmail.com"
          name="email"
          autoComplete="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-1 sm:p-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 bg-gray-100"
        />
        {error && (
          <div className="w-full text-center text-xs sm:text-sm font-semibold text-red-700 bg-red-100 border-l-4 border-red-500 p-2 mt-2 rounded-md">
            {error}
          </div>
        )}
        {sent && (
          <div className="w-full text-center text-sm font-semibold text-green-700 bg-green-100 border-l-4 border-green-500 p-2 mt-2 rounded-md">
            {sent}
          </div>
        )}
        {loading ? (
          <button className="w-36 h-9 mt-4 bg-red-700 text-white font-bold rounded-lg flex items-center justify-center">
            <ImSpinner8 className="animate-spin w-5 h-5" />
          </button>
        ) : (
          <button className="w-32 sm:w-36 h-7 sm:h-9 mt-4 bg-red-700 hover:bg-red-900 text-sm sm:text-base text-white font-bold rounded-lg focus:outline-none">
            Enviar
          </button>
        )}
      </form>
    </div>
  );
}

export default SendRecoveryTokenMain;
