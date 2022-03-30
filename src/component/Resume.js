import React from "react";

function Resume() {
  return (

          <div id="resume" className="container mt-5">
            <div className="card mb-3">
              <div className="row">
                <div className="col-md-10">
                  <div className="card-body">
                    <h5 className="card-title">Brief</h5>
                    <p className="card-text"> A creative professional with 3 years of hands on for web &amp; mobile application. I am a multi-tasking web
                      designer with passion for designing clean and functional websites, web applications &amp; development along with print media. I amWeb developer 
                      with experience coding  websites and web application using Javascript, React, Angular, NPM, NodeJS, HTML, CSS, wordPress, javascript, jquary, 
                      Bootstrap. I focus on writing clear and efficient codes. Pixel perfect creation &amp; attention to details are my strengths 
                      and I believe in quality oriented results. Currently residing in Oshawa, ON, Canada. I am looking to grow professionally and personally.</p>
                  </div>
                </div>
                <div className="col-md-2">
                  <img
                    src="./akash.jpeg"
                    className="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <ul>
                <li>
                  <button>Download Resume</button>
                </li>
                <li>
                  <button>LinkedIn</button>
                </li>
                <li>
                  <button>Github</button>
                </li>
                <li>
                  <button>Gmail</button>
                </li>
              </ul>
            </div>
          </div>
  );
}

export default Resume;
