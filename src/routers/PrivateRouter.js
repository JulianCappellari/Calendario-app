import React from "react";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ element: Component, isAuth }) => {
  const location = useLocation();
  localStorage.setItem("lastPath", location.pathname); // Hace que cuando estes (por ej, en dc) y apretes logout, cuanndo vuelvas a aprentar a login te mande de nuevo a dc y no a la pagian principal, es decir, que vuelvas a la pagina que estabas antes
  return isAuth ? <Component /> : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired, // Garantiza que Element sea un componente React válido
  isAuth: PropTypes.bool.isRequired, // Garantiza que isAuth sea un booleano
};

export default PrivateRoute;

