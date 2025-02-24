import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Typed from "typed.js";
import "./Home.css";
import { Button } from "@chakra-ui/react";

const Home = () => {
  const navigate = useNavigate();
  const typer = useRef(null);
  useEffect(() => {
    const typed = new Typed(typer.current, {
      strings: ["Easy!", "Efficient!", "Effortless!"],
      typeSpeed: 100,
      backSpeed: 100,
      loop: true,
    });

    return () => {
      typed.destroy(); // Cleanup the Typed instance when the component unmounts
    };
  }, []);
  return (
    <div className="Home text-center">
      <div className="text-5xl">
        <div>
          <h1 className="heading font-extrabold">
            Assignment tracking made{" "}
            <span className="dynamic-text" ref={typer}></span>
          </h1>
        </div>
        <div className="text-2xl flex justify-around mt-12">
          <Button
            onClick={() => navigate("/login")}
            colorScheme="blue"
          >
            Login
          </Button>

          <Button
            colorScheme="green"
            onClick={() => navigate("/signup")}
          >
            Join for free
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
