"use client";

import "./dropdown.css";

import { useState , useEffect } from "react";
import Link from "next/link";

import { IoIosArrowForward } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";

function Dropdown({ category, options, baseUrl , toggleMenu}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    if(isMobile){
      toggleMenu();
    }
  };

  const toggleDropdown = () => {
    if (isMobile) {
      setIsOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 903;
      setIsMobile(mobile);
  
      // Cierra el dropdown al cambiar entre modos
      if (!mobile) {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="dropdown"
      onMouseEnter={!isMobile ? () => setIsOpen(true) : undefined}
      onMouseLeave={!isMobile ? () => setIsOpen(false) : undefined}
    >
      {!isMobile ? (
        <Link
          href={`${baseUrl}/${category.slug}`}
          className="dropdown-category"
          onClick={handleClose}
        >
          {category.name}
          <IoMdArrowDropdown />
        </Link>
      ) : (
        <div className="dropdown-category" onClick={(e) => {
          e.stopPropagation();
          toggleDropdown();
        }}>
          {category.name}
          <IoMdArrowDropdown />
        </div>
      )}

      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <Link
              key={option.slug}
              href={`${baseUrl}/${category.slug}/${option.slug}`}
              className="dropdown-item"
              onClick={handleClose}
            >
              <IoIosArrowForward className="dropdown-icon" />
              {option.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
