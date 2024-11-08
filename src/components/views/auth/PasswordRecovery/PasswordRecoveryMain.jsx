"use client";

import axios from "axios";
import { useParams , useRouter} from "next/navigation";
import { useState , useEffect} from "react";

function PasswordRecoveryMain() {
  const params = useParams();
  const router = useRouter();
  const token = decodeURIComponent(params.token);

  const [password, setPassword] = useState();
  const [validatePassword, setValidatePassword] = useState();

  const [error, setError] = useState();
  const [success , setSuccess] = useState();

  const [seconds, setSeconds] = useState(5);
 

  useEffect(() => {
    if (seconds === 0) {
      setSeconds(0);
    }
  }, [seconds]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSuccess("");
      setError("");
      const res = await axios.post(`/api/auth/recovery-password`, {
        password,
        validatePassword,
        token,
      });
      
      setSuccess(res.data);

      const countdownInterval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);


      setTimeout(() => {
        clearInterval(countdownInterval);
        router.push('/auth/login');
      }, 5000);

    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="recovery-token-main-container">
      <form onSubmit={handleSubmit} className="recovery-token-main">
        <h3>Ingrese su nueva contraseña</h3>
        <div className="recovery-token-main-data">
          <p>Contraseña</p>
          <input
            type="password"
            placeholder="********"
            name="password"
            autoComplete="password"
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="recovery-token-main-data">
          <p>Confirmar Contraseña</p>
          <input
            type="password"
            placeholder="********"
            name="validate-password"
            autoComplete="password"
            required={true}
            onChange={(e) => setValidatePassword(e.target.value)}
          />
        </div>
        {error && (
          <div className="recovery-token-main-error">
            <p>{error}</p>
          </div>
        )}
        {success && (
          <div className="recovery-token-main-success">
            <p>{success}</p>
            <p>En {seconds} seras redireccionado para iniciar sesion</p>
          </div>
        )}
        <button className="recovery-token-main-button">Cambiar</button>
      </form>
    </div>
  );
}

export default PasswordRecoveryMain;
