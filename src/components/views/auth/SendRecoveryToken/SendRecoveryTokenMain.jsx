"use client";

import axios from "axios";
import { useState } from "react";

function SendRecoveryTokenMain() {
  const [email, setEmail] = useState();
  const [error, setError] = useState();
  const [sent, setSent] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSent("");
      setError("");
      const res = await axios.post(`/api/auth/send-recovery-token`, { email });
      setSent(`Se envio un link de recuperacion a ${res.data}`);
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  return (
    <div className="send-rt-main-container">
      <form onSubmit={handleSubmit} className="send-rt-main">
        <h3>Ingrese su correo electronico</h3>
        <input
          type="email"
          placeholder="Usuario@gmail.com"
          name="email"
          autoComplete="email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && (
          <div className="send-rt-main-error">
            <p>{error}</p>
          </div>
        )}
        {sent && (
          <div className="send-rt-main-sent">
            <p>{sent}</p>
          </div>
        )}
        <button className="send-rt-main-button">Enviar</button>
      </form>
    </div>
  );
}

export default SendRecoveryTokenMain;
