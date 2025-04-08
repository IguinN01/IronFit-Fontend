import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RotaPublica = ({ children }) => {
  const { authToken } = useContext(AuthContext);

  return authToken ? <Navigate to="/" /> : children;
};

export default RotaPublica;