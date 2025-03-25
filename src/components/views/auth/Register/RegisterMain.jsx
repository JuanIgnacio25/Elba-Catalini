"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { Tooltip } from "react-tooltip";
import { IoIosInformationCircleOutline } from "react-icons/io";

function RegisterMain() {
  const router = useRouter();

  const [companyName, setCompranyName] = useState("");
  const [cuit, setCuit] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [purchasingManagerName, setPurchasingManagerName] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [carrier, setCarrier] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validatePassword, setValidatePassword] = useState("");
  const [error, setError] = useState("");

  const [tooltipVisible, setTooltipVisible] = useState(false);

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
        validatePassword,
      });

      router.refresh();
      router.push(
        `/auth/verifying-account/${res.data.savedTemporalUser.email}`
      );
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    let timeout;

    if (tooltipVisible) {
      timeout = setTimeout(() => setTooltipVisible(false), 5000);
    }
    return () => clearTimeout(timeout);
  }, [tooltipVisible]);

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
            onChange={(e) => handleInputChange(e, setCuit)}
          />
        </div>
        <div className="register-main-data">
          <p>
            Celular<span>{"(codigo de area + numero)"}</span>
          </p>
          <input
            type="text"
            placeholder="ej: 3471670274"
            value={phoneNumber}
            name="phone-number"
            autoComplete="phone-number"
            required={true}
            onChange={(e) => handleInputChange(e, setPhoneNumber)}
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
          <div className="relative">
            <input
              type="password"
              placeholder="********"
              name="password"
              autoComplete="password"
              required={true}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setTooltipVisible(true)}
              onBlur={() => setTooltipVisible(false)}
              data-tooltip-id="password-tooltip"
            />
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              data-tooltip-id="password-tooltip"
              onMouseEnter={() => setTooltipVisible(true)}
              onMouseLeave={() => setTooltipVisible(false)}
            >
              <IoIosInformationCircleOutline size={18} />
            </div>
            <Tooltip
              id="password-tooltip"
              isOpen={tooltipVisible}
              place="top"
              className="!bg-gray-800 !text-white !rounded-md !p-3 !text-xs !md:text-sm !shadow-lg !w-44 text-center"
            >
              <p>Debe tener al menos:</p>
              <ul className="list-disc list-inside text-start text-xs mt-1">
                <li>8 caracteres</li>
                <li>1 mayúscula</li>
                <li>1 número</li>
                <li>Sin espacios</li>
              </ul>
            </Tooltip>
          </div>
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
  );
}

export default RegisterMain;
