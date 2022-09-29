import React from "react";
import {CompDisplay} from './JobData'

function NewProjects() {

  
  return (
    <div className="container mt-5">
      <div className="row">
        {CompDisplay.map((item) => {
          return(
            <div className="card mb-3" key={item.index}  style={{padding: "30px 10px", borderBottom: "2px solid white"}}>
            <div className="row no-gutters">
              <div className="col-md-7">
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">
                    {item.appDetail}
                  </p>
                </div>
              </div>
              <div className="col-md-5">
                <img src={item.imgSrc} className="card-img" alt="..." />
              </div>
            </div>
          </div>
          )
        })}
  
      </div>
    </div>
  );
}

export default NewProjects;