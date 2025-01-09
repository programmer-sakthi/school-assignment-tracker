import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="Home">
      <div>
        <h1>Simplify Assignments, Empower Learning</h1>
        <div className="butatons">
          <button onClick={() => navigate("/signup")}>Join for free</button>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
