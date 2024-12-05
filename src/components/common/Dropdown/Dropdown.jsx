"use client";

import "./dropdown.css";

import { useState } from "react";
import Link from "next/link";

import { IoIosArrowForward } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";


function Dropdown({ category, options, baseUrl }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="dropdown"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link href={`${baseUrl}/${category.slug}`} className="dropdown-category">
        {category.name}
        <IoMdArrowDropdown/>
      </Link>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <Link
              key={option.slug}
              href={`${baseUrl}/${category.slug}/${option.slug}`}
              className="dropdown-item"
            > 
              <IoIosArrowForward className="dropdown-icon"/>
              {option.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;