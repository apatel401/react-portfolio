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
                Front End Developer with 4 years of experience in Education,
                Ecommerce, and Retail Sectors. Good Understanding of data
                structure, algorithms and Software Development Life Cycles.
                Resourceful and adaptable to quickly problem solve, debug, and
                stay on schedule with short project deadlines. Passionate about
                automation code, clean, efficient and maintainable code
                demonstrated by a portfolio of projects. Strong project
                execution skills coupled with conceptualization skills and team
                work, turning ideas into projects to solve real problems. Always
                learning new skills. Team player of multiple successful
                projects.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        <FloatingMenu />
      </div>
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
