"use client";

import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";

function VerifyAccountMain() {
  const { token } = useParams();

  const [isVerify, setIsVerify] = useState({});
  const [loading, setLoading] = useState(true);
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

  if (loading) return <div className="verify-account-main-container"><h3>Verificando Cuenta...</h3></div>;

  if (error)
    return (
      <div className="verify-account-main-container">
        <h3>{error}</h3>
        <p>Use un link válido o vuelva a <span className="verify-account-main-error-span"><Link href={"/auth/register"}>registrarse</Link></span></p>
      </div>
    );

  return (
    <div className="verify-account-main-container">
      <h3>Email <span className="verify-account-main-span">{isVerify.email}</span> verificado correctamente</h3>
      <button className="verify-account-main-button">
        <Link href="/auth/login">Ingresá</Link>
      </button>
    </div>
  );
}

export default VerifyAccountMain;
