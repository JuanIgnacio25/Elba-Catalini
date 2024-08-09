"use client"

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const DropdownSelect = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  /* const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || status === 'loading') return null; */

  const options = [];

  if (status !== 'authenticated') {
    options.push({ value: 'login', label: 'Iniciar Sesión' });
    options.push({ value: 'register', label: 'Registrarse' });
  }

  if (status === 'authenticated') {
    options.push({ value: 'orders', label: 'Pedidos' });
    if (session?.user?.rol === 'admin') {
      options.push({ value: 'dashboard', label: 'Dashboard' });
    }
    options.push({ value: 'signOut', label: 'Cerrar Sesión' });
  }

  const handleChange = (selectedOption) => {
    const value = selectedOption.value;

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

  const customStyles = {
    control: (provided) => ({
      ...provided,
      display: 'flex',
      backgroundColor: 'var(--red)',
      color: 'var(--light-grey)',
      borderRadius: '10px',
      padding: '0px 10px',
      height: '35px',
      boxShadow: 'none',
      border: 'none',
      '&:hover': {
        border: 'none',
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'white',
      fontWeight: 'bold',
    }),
    singleValue: (provided) => ({
      ...provided,
      display: 'none',
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: '14px',
      backgroundColor: state.isFocused ? 'var(--red)' : 'white',
      color: state.isFocused ? 'white' : 'grey',
      padding: '10px',
      cursor: 'pointer',
    }),
    dropdownIndicator: () => ({
      color: 'var(--light-grey)',
      padding: 0,
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'white',
      borderRadius: '0 0 10px 10px',
      marginTop: 0,
    }),
  };

  return (
    <div className="nav-main-menu-select">
      <Select
        options={options}
        styles={customStyles}
        placeholder={
          <div className="nav-main-menu-placeholder">
            <FaRegUser className="nav-main-menu-icon-user" />
            <span>Cuenta</span>
          </div>
        }
        onChange={handleChange}
        components={{
          DropdownIndicator: () => <IoIosArrowDown className="nav-main-menu-select-arrow" />,
        }}
        isSearchable={false}
        value={null}
      />
    </div>
  );
};

export default DropdownSelect;