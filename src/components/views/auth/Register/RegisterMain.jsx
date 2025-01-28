"use client"

import { useState, useEffect } from "react";
import { useRouter} from "next/navigation";
import { useSession} from "next-auth/react";
import axios from "axios";
import Link from "next/link";

function RegisterMain() {

  const router = useRouter();

  const [companyName, setCompranyName] = useState("");
  const [cuit , setCuit] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [purchasingManagerName, setPurchasingManagerName] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [carrier, setCarrier] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validatePassword, setValidatePassword] = useState("");
  const [error, setError] = useState("");



  const handleInputChange = (e, setState) => {
    const inputValue = e.target.value;

    if (/^\d*$/.test(inputValue)) {
      setState(inputValue);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/api/auth/signup", {
        companyName,
        cuit,
        phoneNumber,
        purchasingManagerName,
        location,
        address,
        carrier,
        email,
        password,
        validatePassword
      });
      
      router.refresh();
      router.push(`/auth/verifying-account/${res.data.savedTemporalUser.email}`);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-main-container">
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
          <p>CUIT</p>
          <input
            type="text"
            value={cuit}
            placeholder="20431266629"
            name="cuit"
            autoComplete="cuit"
            required={true}
            onChange={(e) => handleInputChange(e,setCuit)}
          />
        </div>
        <div className="register-main-data">
          <p>Celular<span>{"(codigo de area + numero)"}</span></p>
          <input
            type="text"
            placeholder="ej: 3471670274"
            value={phoneNumber}
            name="phone-number"
            autoComplete="phone-number"
            required={true}
            onChange={(e) => handleInputChange(e,setPhoneNumber)}
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
          <p>Direccion de la Empresa</p>
          <input
            type="text"
            placeholder="Arevalo 1440"
            name="address"
            autoComplete="address"
            required={true}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="register-main-data">
          <p>Transporte</p>
          <input
            type="text"
            placeholder="Transporte Miguel"
            name="carrier"
            autoComplete="carrier"
            required={true}
            onChange={(e) => setCarrier(e.target.value)}
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
            placeholder="********"
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
            placeholder="********"
            name="validate-password"
            autoComplete="validate-password"
            required={true}
            onChange={(e) => setValidatePassword(e.target.value)}
          />
        </div>
        {error && <div className="register-main-error">{error}</div>}
      </div>
      <button className="register-main-button">Registrarse</button>
    </form>
  )
}

export default RegisterMain