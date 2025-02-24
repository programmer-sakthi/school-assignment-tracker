import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";
import frontImg from "./images/frontImg.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, onLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("User in Context:", user);
    if (user) {
      navigate("/dashboard");
    }
  }, [user]); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/validate-login",
        { email, password }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "User Logged in Successfully",
        });

        const userData = response.data;
        sessionStorage.setItem("user", JSON.stringify(userData));
        onLogin(userData); // 👈 Correctly update context state

        navigate("/dashboard");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: error.response?.data || "An error occurred. Please try again.",
      });
      console.error(error);
    }
  };

  return (
    <div className="Login">
      <div className="container p-0">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="form-content p-0 m-0">
              <div className="title">
                <span>Lo</span>gin
              </div>
              <div className="input-boxes">
                <div className="input-box">
                  <i className="fas fa-envelope"></i>
                  <input
                    type="text"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="text" style={{ marginTop: "30px" }}>
                  <a href="#">Forgot password?</a>
                </div>
                <div className="button input-box">
                  <input type="submit" value="Login" />
                </div>
                <div className="text sign-up-text">
                  Don't have an account?{" "}
                  <a onClick={() => navigate("/signup")}>Signup now</a>{" "}
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="image p-0 m-0">
          <img src={frontImg} alt="icon" />
        </div>
      </div>
    </div>
  );
};

export default Login;
