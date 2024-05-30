"use client";

import axios from "axios";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post("/api/auth/signup", {
        fullname,
        email,
        password,
      });

      /*  const nextAuthResponse = await signIn("credentials", {
        email: res.data.email,
        password: password,
        redirect: false,
      }); */
      router.refresh();
      router.push("/auth/login");
    } catch (error) {
      console.log(error.response);
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="text-black">
        <h1>SignUp</h1>
        <input
          type="text"
          placeholder="Usuario"
          name="fullname"
          required={true}
          onChange={(e) => setFullname(e.target.value)}
        />
        <input
          type="email"
          placeholder="Usuario@gmail.com"
          name="email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="********"
          name="password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button className="bg-white">Register</button>
      </form>
    </div>
  );
}

export default Register;
