"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { FiUser } from "react-icons/fi";

import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

function DropdownMenuAccount() {
  const { authState } = useAuth();
  const isLoggedIn = authState.status === "authenticated";
  const isAdmin = authState.session?.user?.rol === "admin";

  const [isOpen, setIsOpen] = useState(false);

  const dropdownMenuOptions = [
    { href: "/orderHistory", label: "Pedidos" },
    { href: "/contact", label: "Contacto" },
    { href: "/admin/dashboard", label: "Panel admin", isAdminRequired: true },
  ];

  return (
    <DropdownMenu modal={false} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Menú de cuenta"
          className={`border-none outline-none shadow-none p-0 !text-2xl text-white hover:text-red-500 ${
            isOpen ? "!text-red-500" : ""
          } transition`}
        >
          <FiUser />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-36 z-[1100]">
        {isLoggedIn ? (
          <>
            {dropdownMenuOptions.map((item) => {
              if (item.isAdminRequired && !isAdmin) return null;
              return (
                <DropdownMenuItem
                  asChild
                  key={item.href}
                  className="text-sm px-4 py-2 text-gray-700 bg-transparent !hover:bg-red-500 hover:text-white transition-colors rounded-none cursor-pointer"
                >
                  <Link href={item.href} className="w-full h-full block">
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: "/" })}
              type="button"
              className="text-sm px-4 py-2 text-gray-700 bg-transparent hover:bg-red-500 hover:text-white transition-colors rounded-md cursor-pointer"
            >
              Cerrar sesión
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem
              asChild
              className="text-sm px-4 py-2 text-gray-700 !hover:bg-red-500 hover:text-white transition-colors rounded-md cursor-pointer"
            >
              <Link href="/auth/login">Iniciar Sesión</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className="text-sm px-4 py-2 text-gray-700 hover:bg-red-500 hover:text-white transition-colors rounded-md cursor-pointer"
            >
              <Link href="/auth/register">Registrarse</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropdownMenuAccount;
