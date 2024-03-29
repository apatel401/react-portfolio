/* eslint-disable no-unreachable */
import React, { useState, useEffect } from "react";
import {
  MultipleChoiceComponent,
  DragDropMatching,
  Flowchart,
  Flashcards,
  MultipleChoiceCheckbox,
  ImageHotspots,
  Sorting,
} from "../component-library/src";
import { CompDisplayLibrary } from "./JobData";

export default function ComponentLibrary() {
  const [activeComp, setActiveComp] = useState("1");

  useEffect(() => {}, []);

  const pickComponent = () => {
    switch (activeComp) {
      case "1":
        return <MultipleChoiceComponent config="./widgets/multiple-choice-component/multiple-choice-component-1.json" id="1" />;
        break;
      case "2":
        return <MultipleChoiceCheckbox config="./widgets/multiple-choice-checkbox/config2.json" id="2"/>;
        break;
      case "3":
        return <ImageHotspots config="./widgets/image-hotspots/image-hotspots.json" id="3" />;
        break;
      case "4":
        return  <Flashcards config="./widgets/flashcards/config.json" id="4" />;
        break;
      case "5":
        return <DragDropMatching config="./widgets/drag-and-drop-matching/matching.json" id="5" />;
        break;
      case "6":
        return <Sorting config="./widgets/sorting/sorting.json" id="6" />;
        break;
      case "7":
        return <Flowchart config="./widgets/flowchart/flowchart1.json" id="7" />;
        break;
      case "8":
        return <Sorting config="./widgets/sorting/sorting.json" id="8" />;
        break;
      case "9":
        return <Flashcards config="./widgets/flashcards/config3.json" id="9" />;
        break;
      case "10":
        return <Flashcards config="./widgets/flashcards/config3.json" id="10" />;
        break;
      default:
        console.log("default");
        break;
    }
  };

  const switchComp = (component) =>{
    setActiveComp(component.id);
  }

  return (
    <>
      <div className="comp-wrapper">
      <ul className="component-btn">
        {CompDisplayLibrary.map((component) => {
          return <li key={component.id}><button className={ component.id === activeComp ? "active" : ""} onClick={() => switchComp(component)}>{component.name}</button></li>;
        })}
      </ul>
      <div className="component-space">
        {pickComponent()}
      </div>
      </div>
    </>
  );
}