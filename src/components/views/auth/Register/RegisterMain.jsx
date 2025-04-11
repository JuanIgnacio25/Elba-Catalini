"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Tooltip } from "react-tooltip";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { ImSpinner8 } from "react-icons/im";

function RegisterMain() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: "",
    cuit: "",
    phoneNumber: "",
    purchasingManagerName: "",
    location: "",
    address: "",
    carrier: "",
    email: "",
    password: "",
    validatePassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/signup", formData);
      router.refresh();
      router.push(
        `/auth/verifying-account/${res.data.savedTemporalUser.email}`
      );
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
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
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto p-6 bg-white shadow-md rounded-lg"
    >
      <h1 className="text-2xl font-bold text-gray-700 mb-3 border-b pb-1 md:pb-2">
        Crear una Cuenta
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            label: "Razón Social",
            name: "companyName",
            type: "text",
            placeholder: "Elba Susana Catalini",
          },
          {
            label: "Nombre del encargado de Compras",
            name: "purchasingManagerName",
            type: "text",
            placeholder: "Leandro",
          },
          {
            label: "Localidad/Provincia",
            name: "location",
            type: "text",
            placeholder: "Ciudad, Provincia",
          },
          {
            label: "Dirección de la Empresa",
            name: "address",
            type: "text",
            placeholder: "Arevalo 1440",
          },
          {
            label: "CUIT",
            name: "cuit",
            type: "text",
            placeholder: "20227895529",
          },
          {
            label: "Celular (código de área + número)",
            name: "phoneNumber",
            type: "text",
            placeholder: "ej: 3471670274",
          },
          {
            label: "Transporte",
            name: "carrier",
            type: "text",
            placeholder: "Transporte Miguel",
          },
        ].map(({ label, name, type, placeholder }) => (
          <div key={name} className="flex flex-col">
            <label className="font-semibold text-gray-600">{label}</label>
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              value={formData[name]}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-red-500 bg-gray-100"
              required
            />
          </div>
        ))}
        <h3 className="col-span-1  md:col-span-2 lg:col-span-3 text-lg md:text-xl font-semibold text-gray-700 border-b pb-1 md:pb-2">
          Datos de acceso
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 md:col-span-2 lg:grid-cols-3 lg:col-span-3 gap-4">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-600">
              Correo Electronico
            </label>
            <input
              type="email"
              name="email"
              placeholder="ejemplo@gmail.com"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-red-500 bg-gray-100"
              required
            />
          </div>
          <div className="flex flex-col relative">
            <label className="font-semibold text-gray-600">Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              onFocus={() => setTooltipVisible(true)}
              onBlur={() => setTooltipVisible(false)}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-red-500 bg-gray-100"
              required
            />
            <div
              className="absolute right-3 top-11 -translate-y-1/2 text-gray-500 cursor-pointer"
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
          <div className="flex flex-col">
            <label className="font-semibold text-gray-600">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              name="validatePassword"
              placeholder="********"
              value={formData.validatePassword}
              onChange={handleChange}
              autoComplete="validate-new-password"
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-red-500 bg-gray-100"
              required
            />
          </div>
        </div>
      </div>
      {error && (
        <div className="w-full flex justify-center my-2">
          <div className="w-[50%] bg-red-100 border-l-4 border-red-500 text-red-700 p-2 text-sm font-semibold rounded-md">
            {error}
          </div>
        </div>
      )}
      <div className="mt-4 flex justify-center">
        {loading ? (
          <button className="min-w-[130px]  bg-red-500 text-white py-1.5 px-6 rounded-lg flex items-center justify-center">
            <ImSpinner8 className="w-5 h-5 animate-spin" />
          </button>
        ) : (
          <button className="bg-red-700 hover:bg-red-900 text-white py-1 px-5 rounded-lg font-bold transition-colors">
            Registrarse
          </button>
        )}
      </div>
    </form>
  );
}

export default RegisterMain;
