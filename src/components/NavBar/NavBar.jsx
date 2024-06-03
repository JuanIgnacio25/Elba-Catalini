"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import "./navbar.css";

function NavBar() {
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log(session, status);
  const handleSignout = async () => {
    await signOut({ redirect: false });
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="nav-bar">
      <ul>
        <li>
          <Link href="/">Next Auth</Link>
        </li>
      </ul>
      <ul className="nav-bar-menu">
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        {session ? (
          <li onClick={handleSignout}>Signout</li>
        ) : (
          <li>
            <Link href="/auth/login">Login</Link>
          </li>
        )}
        <li>
          <Link href="/auth/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
