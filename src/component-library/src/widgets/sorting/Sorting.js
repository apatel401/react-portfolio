import React, { useState, useEffect } from "react";
import ProviderComponent from "./components/Provider";
import SortingWrapper from "./components/SortingWrapper";
import "../../../styles/sorting/style.scss";

function Sorting(props) {
  const [config, setConfig] = useState();

  useEffect(() => {
    fetch(props.config)
      .then((response) => response.json())
      .then((data) => setConfig(data));
  }, []);

  return config !== undefined && config !== "" ? (
    <div className="sorting-container">
      <ProviderComponent config={config}>
        <SortingWrapper config={config} id={props.id} />
      </ProviderComponent>
    </div>
  ) : (
    <div className="alert">No config file found for Sorting {props.id}</div>
  );
}

export default Sorting;
