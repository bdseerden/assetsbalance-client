import logo from "./blockfolio.png";
import { NavLink } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import "./styles.css";

export default function Footer() {
  return (
    <div className="footer-section">
      <div className="footer-signup">
        <NavLink to="/">
          <img src={logo} alt=""></img>
        </NavLink>
      </div>
      <div className="footer-links">
        <div className="footer-list">
          <h3>My account</h3>
          <ul>
            <li>My portfolio</li>
          </ul>
        </div>
        <div className="footer-socials">
          <h3>Follow us</h3>
          <FaInstagram className="footer-icon-social" />
          <FaFacebookF className="footer-icon-social" />
          <FaTwitter className="footer-icon-social" />
        </div>
      </div>
    </div>
  );
}
