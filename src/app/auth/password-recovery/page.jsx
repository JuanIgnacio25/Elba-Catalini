"use client";

import axios from "axios";
import { useState } from "react";

function RecoverPasswordPage() {
  const [email, setEmail] = useState();
  const [error, setError] = useState();

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      setError("");
      const res = await axios.post(`/api/auth/send-recovery-token`, {email} );
      console.log(res);
    } catch (err) {
      setError(err.response.data.message);
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="text-black">
        <h1>Correo electronico</h1>
        <input
          type="email"
          placeholder="Usuario@gmail.com"
          name="email"
          autoComplete="email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="bg-white">Send</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default RecoverPasswordPage;
