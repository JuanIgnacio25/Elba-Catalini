import Link from "next/link";

function NavDesktop() {
  return (
    <nav className="nav-desktop">
      <ul className="nav-desktop-menu">
        <li>
          <Link href="/products/baiml">Productos baiml</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavDesktop