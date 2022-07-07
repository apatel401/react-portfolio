import React from "react";
import ProviderComponent from "./components/Provider";
import FlowchartWrapper from "./components/FlowchartWrapper";
import "../../../styles/flowchart/style.scss"


function Flowchart(props) {
  return props.config !== undefined && props.config !== "" ? (
    <>
      <ProviderComponent config={props.config}>
        <FlowchartWrapper id={props.id} config={props.config} />
      </ProviderComponent>
    </>
  ) : (
    <div className="alert">No config file found for Flowchart {props.id}</div>
  );
}

export default Flowchart;
