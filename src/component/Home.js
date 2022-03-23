import React, { useRef, useState, useEffect, useContext } from "react";
import Lottie from "lottie-react";
import testAnimation from "./assets/skills.json";

import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";
// import { ThemeContext } from "./Provider";

export default function Home() {
  const [lines, setLines] = useState([]);
  const splitRef = useRef(null);
  // const context = useContext(ThemeContext);

  useEffect(() => {
    if (splitRef) {
      let split_res = Splitting({
        by: "chars",
        whitespace: true,
      });
      setLines(split_res[0].chars);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [splitRef]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // function switchTheme() {
  //   const newTheme = context.theme === "dark" ? "light" : "dark";
  //   context.updateContext({ theme: newTheme });
  // }

  return (
    <div className="container-fluid home">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-xs-12">
            <Lottie
              option={defaultOptions}
              animationData={testAnimation}
              loop={true}
            />
          </div>
          <div className="col-sm-6 col-xs-12 d-flex justify-content-center align-items-center">
            <h2 ref={splitRef} data-splitting="true">
              I am a front-end Developer On verge of Becoming Fullstack
              Developer
            </h2>
            
            </div>
          </div>
        </div>
      </div>
  );
}
