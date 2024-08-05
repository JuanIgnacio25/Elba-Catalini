"use client"

import axios from "axios";
import { useParams } from "next/navigation";
import { useState } from "react";

function PasswordRecoveryPage() {
  
  const params = useParams();
  const token = decodeURIComponent(params.token);

  const [password , setPassword] = useState();
  const [validatePassword, setValidatePassword] = useState();

  const [error , setError] = useState();

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      setError("");
      const res = await axios.post(`/api/auth/recovery-password`, {password,validatePassword,token} );
      console.log(res);
    } catch (err) {
      setError(err.response.data.message);
      console.log(err);
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit} className="text-white">
        <h1>Contraseña</h1>
        <input
        className="text-black"
          type="password"
          placeholder="********"
          name="password"
          autoComplete="password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        <h1>Verificar Contraseña</h1>
        <input
        className="text-black"
          type="password"
          placeholder="********"
          name="validate-password"
          autoComplete="password"
          required={true}
          onChange={(e) => setValidatePassword(e.target.value)}
        />
        <button className="bg-white text-black">Send</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default PasswordRecoveryPage;