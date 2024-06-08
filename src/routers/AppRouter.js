import React, { useEffect } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import LoginScreen from "../components/auth/LoginScreen";
import CalendarioScree from "../components/calendario/CalendarioScree";
import { useDispatch, useSelector } from "react-redux";
import { empezarCheking } from "../actions/auth";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRouter";

const AppRouter = () => {
  const dispach = useDispatch();
  const {checking, uid} = useSelector(state => state.auth );
  useEffect(() => {
    dispach(empezarCheking());
  }, [dispach]);

  if(checking){
    return (<h5>Porfavor espere un momento que nos estamos conectando a la base de datos...</h5>)
  }

  return (
    <div>
      <Routes>
        <Route exact path="/login" element={<PublicRoute element={LoginScreen} isAuth={!!uid} />} />
        <Route exact path="/" element={<PrivateRoute element={CalendarioScree} isAuth={!!uid} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
