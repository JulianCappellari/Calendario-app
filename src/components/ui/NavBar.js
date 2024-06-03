import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { empezarLogout } from "../../actions/auth";

const NavBar = () => {
  const {nombre} = useSelector(state => state.auth );
  const dispach = useDispatch();
  const handleLogout = () => {
    dispach(empezarLogout())
  }
  return (
    <div className="navbar ">
      <span className="navbar-span">{nombre}</span>
      <button className="btn" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt"></i>
        <span>Salir</span>
      </button>
    </div>
  );
};

export default NavBar;
