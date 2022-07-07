import React, {useEffect, useState} from "react";
import ProviderComponent from "./components/Provider";
import FlashcardsWrapper from "./components/FlashcardsWrapper";
import "../../../../component-library/styles/flashcards/style.scss"


function Flashcards(props) {
	const [config, setConfig] = useState();

  useEffect(() => {
    fetch(props.config)
      .then((response) => response.json())

      .then((data) => setConfig(data));
  }, []);

  return config !== undefined && config !== "" ? (
    <>
      <ProviderComponent config={config}>
        <FlashcardsWrapper id={props.id} config={config} />
      </ProviderComponent>
    </>
  ) : (
    <div className="alert">No config file found for Flashcards {props.id}</div>
  );
}

export default Flashcards;
