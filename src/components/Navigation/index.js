import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import NavbarItem from "./NavbarItem";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import "./styles.css";
import logo from "./assetsBalanceIcon.png";

export default function Navigation() {
  const token = useSelector(selectToken);

  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

  return (
    <div className="navbarContainer">
      <Navbar expand="lg" variant="dark">
        <Navbar.Brand as={NavLink} to="/">
          <img src={logo} alt="logo" className="navbarLogo" height="50rem" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav style={{ width: "100%" }} fill>
            <NavbarItem path="/" linkText="Home" />
            {loginLogoutControls}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

// test
