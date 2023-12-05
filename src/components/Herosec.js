import React from "react";
import "./css/heroSec.css";
import { Link } from "react-router-dom";

function Herosec() {
  

  return (
    <div className="hero_sec">
      <nav>
        <h1>
          Quiz<span>Wiz</span>{" "}
        </h1>
      </nav>
      <div className="main container">
        <h1>
          Put your thinking <br /> <span>CAPS ON</span> <br /> and start this{" "}
          <br /> <span>QUIZ!!</span>{" "}
        </h1>
        <Link to="/Category">
          <button>Start</button>
        </Link>
      </div>
    </div>
  );
}

export default Herosec;
