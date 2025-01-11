import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate=useNavigate()
  const typer = useRef(null);
  useEffect(() => {
    const typed = new Typed(typer.current, {
      strings: ["Easy!", "Effective!"],
      typeSpeed: 100,
      backSpeed: 100,
      loop: true,
    });

    return () => {
      typed.destroy(); // Cleanup the Typed instance when the component unmounts
    };
  }, []); // The empty dependency array ensures this effect runs only once (on mount)

  return (
    <div className="Home">
      <div>
        <div className="message">
          <h1 className="text-center mt-2 fs-4 " style={{ display: "inline" }}>
            Assignment tracking made{" "}
            <span className="dynamic-text" ref={typer}></span>
          </h1>
        </div>
        <div className="buttons row justify-content-around mt-5">
          <button
            className="col-auto btn btn-primary"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="col-auto btn btn-outline-info"
            onClick={() => navigate("/signup")}
          >
            Join for free
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
