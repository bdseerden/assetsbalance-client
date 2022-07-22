import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/user/slice";
import Button from "react-bootstrap/Button";
import { selectUser } from "../../store/user/selectors";
import NavbarItem from "./NavbarItem";
import Nav from "react-bootstrap/Nav";

export default function LoggedIn() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <>
      {user ? (
        <>
          <NavbarItem path={`/portfolio/${user.id}`} linkText="Porfolio" />
          <Nav.Item style={{ padding: ".5rem 1rem" }}>{user?.email}</Nav.Item>
          <Button className="logoutButton" onClick={() => dispatch(logOut())}>
            Logout
          </Button>
        </>
      ) : null}
    </>
  );
}
