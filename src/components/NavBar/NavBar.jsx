import "./navbar.css";
import NavMain from "@/components/NavBar/NavMain";
import NavHeader from "@/components/NavBar/NavHeader";
import NavDesktop from "@/components/NavBar/NavDesktop"

function NavBar() {
  return (
    <div>
      <NavHeader/>
      <NavMain />
      <NavDesktop/>
    </div>
  );
}

export default NavBar;
