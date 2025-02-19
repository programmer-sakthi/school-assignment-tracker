import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2"; // Using SweetAlert for the error message

const ProtectedRouting = ({ children }) => {
  const { user } = useContext(AuthContext);

  const notLoggedIn = () => {
    Swal.fire({
      icon: "error",
      title: "Access Denied",
      text: "You must be logged in to access this page.",
    });

    return <Navigate to="/login" replace />;
  };

  return user ? children : notLoggedIn();
};

export default ProtectedRouting;
