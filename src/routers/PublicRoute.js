
import React from "react";
import PropTypes from "prop-types";
import { Navigate} from "react-router-dom";

const PublicRoute = ({ element: Component, isAuth }) => {
  return !isAuth ?  <Component /> : <Navigate to="/" />;
};

PublicRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};

export default PublicRoute;
