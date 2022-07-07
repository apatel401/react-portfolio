import React from "react";
import {MultipleChoiceComponent, DragDropMatching, Flowchart, Flashcards} from "../src/";

const App = () => {
  return (
	<>
	  <MultipleChoiceComponent config="../widgets/multiple-choice-component/multiple-choice-component-1.json" id="1" />
	  <DragDropMatching config="../widgets/drag-and-drop-matching/matching.json" id="1" />
	  <Flowchart config="../widgets/flowchart/flowchart2.json" id="2" />
	  <Flashcards config="../widgets/flashcards/config.json" id="2" />
	  <Flashcards config="../widgets/flashcards/config2.json" id="3" />
	  <Flashcards config="../widgets/flashcards/config3.json" id="4" />
	  {/* <Flowchart config="../widgets/flowchart/flowchart3.json" id="3" /> */}
      </>
  );
};

export default App;