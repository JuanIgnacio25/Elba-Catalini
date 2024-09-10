"use client";

import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const SelectAccount = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState("Cuenta");

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue("Cuenta"); 

    switch (value) {
      case 'login':
        router.push('/auth/login');
        break;
      case 'register':
        router.push('/auth/register');
        break;
      case 'orders':
        router.push('/orderHistory');
        break;
      case 'dashboard':
        router.push('/admin/dashboard');
        break;
      case 'signOut':
        signOut();
        break;
      default:
        break;
    }
  };

  return (
    <div className="nav-main-menu-select">
      <FaRegUser className="nav-main-menu-icon-user" />
      <select value={selectedValue} onChange={handleChange}>
        <option disabled value="Cuenta" style={{ display: 'none' }}>
          Cuenta
        </option>
        {status !== 'authenticated' && <option value="login">Iniciar Sesion</option>}
        {status !== 'authenticated' && <option value="register">Registrarse</option>}
        {status === 'authenticated' && <option value="orders">Pedidos</option>}
        {session && session.user.rol === 'admin' && (
          <option value="dashboard">Dashboard</option>
        )}
        {status === 'authenticated' && <option value="signOut">Cerrar sesion</option>}
      </select>
      <IoIosArrowDown className="nav-main-menu-select-arrow"/>
    </div>
  );
};

export default SelectAccount;