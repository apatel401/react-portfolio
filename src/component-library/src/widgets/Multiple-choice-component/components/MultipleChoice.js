import React, { useContext } from "react";
import { MultipleChoiceConfig, MultipleChoiceContext } from "./Provider";
import Question from "./Question";
import SkipLink from "../../SkipLink";

function MultipleChoice() {
  const config = useContext(MultipleChoiceConfig);
  const context = useContext(MultipleChoiceContext);

  const allQue = config.questions.map((question, index) => 
    { return(
    <Question
      id={`${index + 1}-${config.id}-q`}
      index={index}
      question={question.questionText}
      options={question.answerOptions}
      imgSrc={question.questionImg}
      imgAlt={question.questionImgAlt}
    />
    )
    });

  return (
    <div className="multiple-choice-container">
    <div className="multiple-choice--container">
        	<SkipLink
				elemOrSec={"elem"}
				section={"start"}
				iloName={"multiple-choice"}
				instanceId={config.id}
				text={config.iloStartText}
				linkText={config.iloStartLink}
			/>
          {allQue[context.questionIndex]}
      <SkipLink
				elemOrSec={"elem"}
				section={"end"}
				iloName={"multiple-choice"}
				instanceId={config.id}
				text={config.iloEndText}
				linkText={config.iloEndLink}
			/>
    </div>
    </div>
  );
}

export default MultipleChoice;
