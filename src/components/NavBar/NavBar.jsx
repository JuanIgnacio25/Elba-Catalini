import "./navbar.css";
import NavMain from "@/components/NavBar/NavMain";
import NavDesktop from "@/components/NavBar/NavDesktop"

function NavBar() {
  return (
    <div className="nav-bar-container">
      <NavMain />
      <NavDesktop/>
    </div>
  );
}

export default NavBar;
