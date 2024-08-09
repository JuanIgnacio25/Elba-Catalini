import Link from "next/link";
import Image from "next/image";
import { BsCart3 } from "react-icons/bs";
import { IoSearchSharp } from "react-icons/io5";

import DropdownSelectWrapper from "@/components/NavBar/DropdownSelectWrapper";

function NavMain() {
  return (
    <nav className="nav-main">
      <ul>
        <li>
          <Link href="/">
            <Image
              src="/logo-main.png"
              alt="Logo-Main"
              width={800}
              height={169} 
              className="nav-main-responsive-image"
              priority 
            />
          </Link>
        </li>
      </ul>
      <ul className="nav-main-search-container">
        <li className="nav-main-search">
          <input placeholder="¿Que estas buscando?" />
          <button>
            <IoSearchSharp className="nav-main-search-icon" />
          </button>
        </li>
      </ul>
      <ul className="nav-main-menu">
        <li>
          <Link href="/cart">
            <BsCart3 className="nav-main-menu-icon-cart" />
          </Link>
        </li>
        <li>
          <DropdownSelectWrapper/>
        </li>
      </ul>
    </nav>
  );
}

export default NavMain;
