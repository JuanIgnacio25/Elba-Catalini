import { RiInstagramFill } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa6";

function FooterSocialmedia() {
  return (
    <div className="footer-main-socialmedia">
      <h2>Seguinos</h2>
      <div className="footer-main-socialmedia-icons">
        <div className="footer-main-socialmedia-icons-container">
          <a href="https://www.instagram.com/la_casa_del_acceso_/" target="_blank" rel="noopener noreferrer">
            <RiInstagramFill className="footer-main-socialmedia-instagram" />
          </a>
        </div>

        <div className="footer-main-socialmedia-icons-container">
        <a href="https://www.facebook.com/ElbaCatalini" target="_blank" rel="noopener noreferrer">
          <FaFacebookF className="footer-main-socialmedia-facebook" />
        </a>
        </div>
      </div>
    </div>
  );
}

export default FooterSocialmedia;
