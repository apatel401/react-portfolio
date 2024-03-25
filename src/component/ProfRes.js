import React, { useState } from "react";
import FloatingMenu from "./FloatingMenu";
import { JobData, School } from "./JobData";

function ProfRes() {
  const [value, setValue] = useState(0);
  const { title, duties, dates } = JobData[value];
  return (
    <div id="resume" className="container mt-5">
      <h1 className="text-center">Resume</h1>
      <div className="card mb-3">
        <div className="row">
          <div className="col-md-12">
            <div className="card-body">
              <h2 className="card-title">Profile</h2>
              <p className="card-text">
              Dedicated and highly skilled Web Developer/Software Developer with over 5 years of experience in designing, developing, and maintaining innovative web applications and software solutions. Seeking a challenging position in a dynamic organization where I can leverage my expertise in front-end and back-end technologies, programming languages, and problem-solving abilities to contribute to the development of cutting-edge software products and enhance user experiences. Committed to staying updated with emerging trends in web and software development to deliver efficient and scalable solutions.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      {/* <div className="row">
        <FloatingMenu />
      </div> */}
      <div className="row">
        <div className="col-md-12">
          <h2 className="text-center">Experience</h2>
          <div className="ex-container">
            <div className="title-container">
              {JobData.map((job, index) => {
                return (
                  <button
                    key={job.id}
                    id={job.id}
                    onClick={() => setValue(index)}
                    className={
                      index === value ? "job-btn active-btn" : "job-btn"
                    }
                  >
                    {job.company}
                  </button>
                );
              })}
            </div>
            <div className="details-container">
              <h3>{title}</h3>
              <ul>

              </ul>
              {dates.split(",").length > 1 ? (
                <>
                  <p className="dates">{dates.split(",")[0]}</p>
                  <p>{dates.split(",")[1]}</p>
                </>
              ) : (
                <p>{dates}</p>
              )}
              {duties.map((duty) => {
                return <p>- {duty}</p>;
              })}
            </div>
            <div className="col-md-12">
              <h2 className="text-center">Education</h2>
              <div className="college">
                <h3>{School[0].name}</h3>
                <p>
                  <strong>{School[0].courseName}</strong>
                </p>
                <p>
                  <strong>{School[0].year}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfRes;
