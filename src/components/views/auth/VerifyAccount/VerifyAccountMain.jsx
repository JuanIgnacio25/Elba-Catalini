"use client";

import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";

function VerifyAccountMain() {
  const { token } = useParams();

  const [isVerify, setIsVerify] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const hasFetched = useRef(false);

  const fetchVerification = useCallback(async () => {
    if (!token || hasFetched.current) return;
    hasFetched.current = true;
    setLoading(true);
    try {
      const res = await axios.get(`/api/auth/verify-account/${token}`);
      setIsVerify(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchVerification();
  }, [fetchVerification]);

  if (loading)
    return (
      <div className="w-full flex flex-row gap-2  justify-center items-center">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
          Verificando cuenta...
        </h3>
        <div className="flex justify-center items-center">
          <div className="w-6 sm:w-8 h-6 sm:h-8 border-2 sm:border-[3px] border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="w-full flex flex-col items-center text-center p-2 sm:p-6 space-y-4">
        <h3 className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 text-sm sm:text-base font-semibold rounded-lg shadow-sm">
          {error}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600">
          Usa un link válido o vuelve a{" "}
          <Link
            href="/auth/register"
            className="text-red-600 font-bold underline transition-colors duration-200 hover:text-red-500"
          >
            registrarte
          </Link>
        </p>
      </div>
    );

  return (
    <div className="w-full flex flex-col items-center text-center p-1 sm:p-6 space-y-4">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
        Email <span className="text-red-600 font-bold">{isVerify.email}</span>{" "}
        verificado correctamente
      </h3>
      <Link
        href="/auth/login"
        className="px-3 sm:px-5 py-1 sm:py-2 bg-gradient-to-r from-red-500 to-red-700 text-sm sm:text-base text-white font-semibold rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:brightness-110 active:scale-95"
      >
        Ingresá
      </Link>
    </div>
  );
}

export default VerifyAccountMain;
