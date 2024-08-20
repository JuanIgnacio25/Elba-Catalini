
import "@/components/Footer/footer.css";
import FooterLogo from "@/components/Footer/FooterLogo"
import FooterInfo from "@/components/Footer/FooterInfo"
import FooterSocialmedia from "@/components/Footer/FooterSocialmedia"
import FooterDeveloped from "@/components/Footer/FooterDeveloped"

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-main">
        <FooterLogo/>
        <FooterInfo/>
        <FooterSocialmedia/>
      </div>
      <FooterDeveloped/>
    </div>
  );
}

export default Footer;
