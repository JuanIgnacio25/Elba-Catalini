"use client";

import React, { useState, useEffect } from "react";
import {signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

import Select from "react-select";

import DropdownSelectFallback from "../Fallbacks/DropdownSelectFallback";
import { IoIosArrowDown } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";

const DropdownSelect = () => {
  const router = useRouter();
  const { authState } = useAuth();

  const [screenWidth, setScreenWidth] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    if (authState.status === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [authState]);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
  
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleUnauthenticatedClick = () => {
    router.push("/auth/login");
  };

  const handleChange = (selectedOption) => {
    const value = selectedOption.value;

    switch (value) {
      case "orders":
        router.push("/orderHistory");
        break;
      case "dashboard":
        router.push("/admin/dashboard");
        break;
      case "signOut":
        signOut({
          callbackUrl: "/",
        });
        break;
      default:
        break;
    }
  };

  const options = [];
  if (authState.status === "authenticated") {
    options.push({ value: "orders", label: "Pedidos" });
    if (authState.session?.user?.rol === "admin") {
      options.push({ value: "dashboard", label: "Dashboard" });
    }
    options.push({ value: "signOut", label: "Cerrar Sesión" });
  }

  const customStyles = {
    control: (provided) => ({
      ...provided,
      display: "flex",
      backgroundColor: "var(--red)",
      color: "var(--light-grey)",
      borderRadius: "10px",
      fontSize: "16px",
      padding: "0px 5px",
      height: "35px",
      boxShadow: "none",
      cursor: "pointer",
      border: "none",
      "&:hover": {
        border: "none",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "white",
      fontWeight: "500",
    }),
    singleValue: (provided) => ({
      ...provided,
      display: "none",
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: "13px",
      backgroundColor: state.isOptionSelected
        ? "var(--red)"
        : state.isFocused
        ? "var(--red)"
        : "white",
      color: state.isSelected
        ? "white"
        : state.isFocused
        ? "white"
        : "grey",
      padding: "8px",
      cursor: "pointer",
    }),
    dropdownIndicator: () => ({
      color: "var(--light-grey)",
      padding: 0,
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "white",
      borderRadius: "0 0 10px 10px",
      marginTop: 0,
      paddingBottom: "3px",
    }),
  };

  if (loading) {
    return <DropdownSelectFallback />;
  }

  return (
    <>
      {authState.status !== "authenticated" ? (
        <button
          className="nav-main-login-button"
          onClick={handleUnauthenticatedClick}
        >
          <FaCircleUser className="nav-main-menu-icon-user" />
          <span>Ingresá</span>
        </button>
      ) : (
        <Select
          options={options}
          styles={customStyles}
          classNamePrefix="nav-main-custom-select"
          placeholder={
            <div className="nav-main-menu-placeholder">
              <FaCircleUser className="nav-main-menu-icon-user sm:text-sm" />
              {screenWidth > 903 && <span>Cuenta</span>}
            </div>
          }
          onChange={handleChange}
          components={{
            DropdownIndicator: () => (
              <IoIosArrowDown className="nav-main-menu-select-arrow" />
            ),
          }}
          isSearchable={false}
          value={null}
        />
      )}
    </>
  );
};

export default DropdownSelect;