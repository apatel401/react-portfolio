import React, {useRef, useState, useEffect} from 'react'
import Lottie from 'lottie-react' 
import testAnimation from './assets/skills.json'

import 'splitting/dist/splitting.css'
import 'splitting/dist/splitting-cells.css'
import Splitting from 'splitting'

export default function Home() {
  const [lines, setLines] = useState([])
  const splitRef = useRef(null)

  useEffect(() => {
    if (splitRef) {
      let split_res = Splitting({
        by: 'chars',
        whitespace: true
      });
      console.log(split_res[0].chars);
      setLines(split_res[0].chars);
      console.log(lines);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [splitRef])

  const defaultOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  

    return (
      <div className="container-fluid home">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-xs-12">
            <Lottie option={defaultOptions} animationData={testAnimation} loop={true} />
            </div>
            <div className="col-sm-6 col-xs-12 d-flex justify-content-center align-items-center">
              <h2 ref={splitRef}
      data-splitting='true'>
                I am a front-end Developer
                On verge of Becoming
                Fullstack Developer
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
}
