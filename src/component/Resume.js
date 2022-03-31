import React, { useState, useEffect } from "react";
import FloatingMenu from "./FloatingMenu";
import { JobData } from "./JobData";

function Resume() {
  // const [jobs, setJobs] = useState(JobData);
  const [value, setValue] = useState(0);
const {title, company, duties, dates } = JobData[value];
  return (
    <div id="resume" className="container mt-5">
      <h1 className="text-center">Resume</h1>
      <div className="card mb-3">
        <div className="row">
          <div className="col-md-10">
            <div className="card-body">
              <h2 className="card-title">Profile</h2>
              <p className="card-text">
                A creative professional with 3 years of hands on for web &amp;
                mobile application. I am a multi-tasking web designer with
                passion for designing clean and functional websites, web
                applications &amp; development along with print media. I amWeb
                developer with experience coding websites and web application
                using Javascript, React, Angular, NPM, NodeJS, HTML, CSS,
                wordPress, javascript, jquary, Bootstrap. I focus on writing
                clear and efficient codes. Pixel perfect creation &amp;
                attention to details are my strengths and I believe in quality
                oriented results. Currently residing in Oshawa, ON, Canada. I am
                looking to grow professionally and personally.
              </p>
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
      <hr />
      <div className="row">
        <FloatingMenu />
      </div>
      <div className="row">
        <h2 className="">Experience</h2>
        <div className="ex-container">
          {JobData.map((job, index) => {
            return (
                <div className="title-container">
                  <button key={job.id} id={job.id} 
                onClick={() => setValue(index)}
                className={`job-btn ${index === value && 'active-btn'}`}>{job.company}</button>
                </div>
                 );
                })}
                <div className="details-container">
                  <h3>{title}</h3>
                  {dates.split(",").length > 1 ? (
                    <>
                      <h4>{dates.split(",")[0]}</h4>
                      <h4>{dates.split(",")[1]}</h4>
                    </>
                  ) : (
                    <h4>{dates}</h4>
                  )}
                  {duties.map((duty) => {
                    return <p>{duty}</p>;
                  })}
                </div>
           
        </div>
      </div>
    </div>
  );
}

export default Resume;
