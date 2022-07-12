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
    </div>
  );
}
