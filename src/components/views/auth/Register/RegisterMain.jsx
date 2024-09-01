"use client"

import { useState, useEffect } from "react";
import { useRouter} from "next/navigation";
import { useSession} from "next-auth/react";
import Link from "next/link";

function RegisterMain() {

  const router = useRouter();

  const [companyName, setCompranyName] = useState("");
  const [purchasingManagerName, setPurchasingManagerName] = useState("");
  const [cuit , setCuit] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validatePassword, setValidatePassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    
  };

  return (
    <div className="register-main-container">
      <h1 className="register-main-title">Registro de Empresa</h1>
      <div className="register-main-data-container">
        <div className="register-main-data">
          <p>Razon Social</p>
          <input
            type="text"
            placeholder="La Casa del Accesorio"
            name="sign"
            autoComplete="sign"
            required={true}
            onChange={(e) => setCompranyName(e.target.value)}
          />
        </div>
        <div className="register-main-data">
          <p>Nombre del encargado de Compras</p>
          <input
            type="text"
            placeholder="Leandro"
            name="purchasing-manager-name"
            autoComplete="name"
            required={true}
            onChange={(e) => setPurchasingManagerName(e.target.value)}
          />
        </div>
        <div className="register-main-data">
          <p>CUIT</p>
          <input
            type="text"
            placeholder="27-675854-6"
            name="cuit"
            autoComplete="cuit"
            required={true}
            onChange={(e) => setCuit(e.target.value)}
          />
        </div>
        <div className="register-main-data">
          <p>Telefo/Celular de la empresa</p>
          <input
            type="text"
            placeholder="3471 670274"
            name="phone-number"
            autoComplete="phone-number"
            required={true}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="register-main-data">
          <p>Localidad/Provincia</p>
          <input
            type="text"
            placeholder="Ciudad, Provincia"
            name="location"
            autoComplete="location"
            required={true}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="register-main-data">
          <p>Email</p>
          <input
            type="email"
            placeholder="ejemplo@gmail.com"
            name="email"
            autoComplete="email"
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="register-main-data">
          <p>Contraseña</p>
          <input
            type="password"
            placeholder="*******"
            name="password"
            autoComplete="password"
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="register-main-data">
          <p>Confirmar Contraseña</p>
          <input
            type="password"
            placeholder="******"
            name="validate-password"
            autoComplete="validate-password"
            required={true}
            onChange={(e) => setValidatePassword(e.target.value)}
          />
        </div>
        {error && <div className="register-main-error">{error}</div>}
      </div>
      <button className="register-main-button" onClick={handleSubmit}>Registrarse</button>
    </div>
  )
}

export default RegisterMain