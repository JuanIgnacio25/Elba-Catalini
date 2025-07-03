"use client";

import Link from "next/link";
import Image from "next/image";

import NavDesktop from "@/components/NavBar/NavDesktop";
import NavDesktopMobile from "@/components/NavBar/NavDesktopMobile";
import NavCart from "@/components/NavBar/NavCart";
import NavSearch from "@/components/NavBar/NavSearch";
import DropdownMenuAccount from "@/components/NavBar/DropdownMenuAccount";

function NavMain({ isScrolled = false }) {
  return (
    <nav
      className={`w-full flex justify-center items-center bg-neutral-900 ${
        isScrolled ? "!h-[11vh]" : "h-[14.5vh]"
      }`}
    >
      <div className="container mx-auto h-full flex justify-between items-center px-2 sm:px-0">
        <Link href="/" className="flex justify-center">
          <Image
            src="/logo-elba.png"
            alt="Logo-Main"
            width={1480}
            height={400}
            className={`${
              isScrolled
                ? "max-w-[150px] md:max-w-[180px] lg:max-w-[260px] h-auto object-contain"
                : "max-w-[170px] md:max-w-[200px] lg:max-w-[330px] h-auto object-contain"
            }`}
            priority
          />
        </Link>

        <NavDesktop />

        <ul className="flex flex-row items-center justify-center gap-2">
          <NavSearch />
          <li className="flex items-center">
            <DropdownMenuAccount />
          </li>
          <li className="nav-main-menu-cart-container">
            <NavCart />
          </li>
          <li className="flex items-center ml-2">
            <NavDesktopMobile />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavMain;
