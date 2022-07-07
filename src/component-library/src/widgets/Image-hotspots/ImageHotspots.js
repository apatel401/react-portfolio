import React, { useState, useEffect}from "react";
import ReactDom from "react-dom";
import InteractiveWrapper from "./components/InteractiveWrapper";
import ProviderComponent from "./components/Provider";
import "../../../styles/Image-hotspots/app.scss";

function ImageHotspots(props) {
  const [config, setConfig] = useState();

  useEffect(() => {
    fetch(props.config)
      .then((response) => response.json())

      .then((data) => setConfig(data));
  }, []);

  return (
    config !== undefined && config !== "" ? (
    <ProviderComponent config={config} id={props.id}>
      <InteractiveWrapper config={config} id={props.id} />
    </ProviderComponent>
  ) : (
    <div className="alert">No config file found</div>
  ))
}

export default ImageHotspots;
