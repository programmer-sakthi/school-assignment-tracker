import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Signup.css";
import backImg from "./images/backImg.jpg";
import studentImageChecked from "./images/student-checked.png";
import studentImage from "./images/student.png";
import teacherImageChecked from "./images/teacher-checked.png";
import teacherImage from "./images/teacher.png";
import { randomQuote } from "./quotes";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [quote, setQuote] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setQuote(randomQuote());
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();

    // handle validation

    try {
      const respose = await axios.post("http://localhost:8080/api/users", {
        name: name,
        email: email,
        password: password,
        type: userType,
      });
      if (respose.status === 200)
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Account Created Successfully!",
        });
      navigate("/login");
    } catch (error) {
      if (error.status === 409) {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Email already exists!",
        });
      }
    }
  };

  return (
    <div className="Signup">
      <div className="container p-0 ">
        <div className="image">
          <img src={backImg} alt="cover-image" />
          <div className="image-text">{quote}</div>
        </div>
        <div className="form">
          <form onSubmit={handleSignup}>
            <div className="form-content">
              <div className="title">
                <span>Si</span>gnup
              </div>
              <div className="input-boxes">
                <div className="input-box">
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <i className="fas fa-envelope"></i>
                  <input
                    type="text"
                    placeholder="Enter your email"
                    required
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="input-box">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    required
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="user-type">
                  <p>Select User Type</p>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <div
                      style={{ border: "2px solid black", padding: "7px" }}
                      onClick={() => setUserType("student")}
                    >
                      <img
                        src={
                          userType == "student"
                            ? studentImageChecked
                            : studentImage
                        }
                        style={{ height: "70px" }}
                      />
                      <p>Student</p>
                    </div>
                    <div
                      style={{ border: "2px solid black", padding: "7px" }}
                      onClick={() => setUserType("teacher")}
                    >
                      <img
                        src={
                          userType == "teacher"
                            ? teacherImageChecked
                            : teacherImage
                        }
                        style={{ height: "70px" }}
                      />
                      <p>Teacher</p>
                    </div>
                  </div>
                </div>
                <div className="button input-box">
                  <input type="submit" value="Sumbit" />
                </div>
                <div className="text s  ign-up-text">
                  Already Have an Account ?{" "}
                  <a onClick={() => navigate("/login")}>Login now</a>{" "}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
