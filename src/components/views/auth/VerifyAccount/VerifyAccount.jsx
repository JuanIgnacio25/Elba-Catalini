"use client";

import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";

function VerifyAccount() {
  const { token } = useParams();

  const [isVerify, setIsVerify] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const hasFetched = useRef(false);

  const fetchVerification = async () => {
    if (!token || hasFetched.current) return;
    hasFetched.current = true;
    setLoading(true);
    try {
      const res = await axios.get(`/api/auth/verify-account/${token}`);
      console.log(res);
      setIsVerify(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerification();
  }, [token]);

  if (loading) return <div>Verificando Cuenta...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Email {isVerify.email} verificado correctamente</h1>
      <p>Inicia sesion con tu email y contraseña</p>
      <button style={{ background: "white", color: "black" }}>
        <Link href="/auth/login">Iniciar Sesion</Link>
      </button>
    </div>
  );
}

export default VerifyAccount;
