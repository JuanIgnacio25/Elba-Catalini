"use client";

import "./dropdown.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";

function Dropdown({ category, options, baseUrl, toggleMenu }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const handleClose = () => {
    setIsOpen(false);
    setOpenSubmenu(null);
    if (isMobile) {
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
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsOpen(false);
        setOpenSubmenu(null);
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
      className="dropdown "
      onMouseEnter={!isMobile ? () => setIsOpen(true) : undefined}
      onMouseLeave={!isMobile ? () => setIsOpen(false) : undefined}
    >
      {!isMobile ? (
        <Link
          href={`${baseUrl}/${category.slug}`}
          className={`dropdown-category ${isOpen ? "!text-red-500 transition" : ""}`}
          onClick={handleClose}
        >
          {category.name}
          <IoMdArrowDropdown />
        </Link>
      ) : (
        <div
          className={`dropdown-category ${isOpen ? "!text-red-500 transition" : ""}`}
          role="button"
          tabIndex="0"
          onPointerDown={(e) => {
            e.stopPropagation();
            if (!isOpen) {
              e.preventDefault();
            }
            toggleDropdown();
          }}
        >
          {category.name}
          <IoMdArrowDropdown />
        </div>
      )}

      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-menu-scroll">
            {options.map((option) => (
              <div
                key={option.slug}
                onMouseEnter={() => setOpenSubmenu(option.slug)}
                onMouseLeave={() => setOpenSubmenu(null)}
              >
                {option.variantSubCategory ? (
                  <div className="dropdown-item has-submenu">
                    {option.name}
                    <IoIosArrowForward className="dropdown-icon" />
                    {openSubmenu === option.slug && (
                      <div className="dropdown-submenu">
                        {option.variantSubCategory.map((sub) => (
                          <Link
                            key={sub.slug}
                            href={`${baseUrl}/${category.slug}/${option.slug}/${sub.slug}`}
                            className="dropdown-item"
                            onClick={handleClose}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={`${baseUrl}/${category.slug}/${option.slug}`}
                    className="dropdown-item"
                    onClick={handleClose}
                  >
                    {option.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
