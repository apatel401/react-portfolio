import React from "react";
import { useState, createContext } from "react";

export const MultipleChoiceContext = createContext();
export const MultipleChoiceConfig = createContext();

export default function ProviderComponent(props) {
  const configInformation = {
    ...JSON.parse(JSON.stringify(props.config)),
    id: props.id,
  };

  const contextInformation = {
    questionIndex: 0,
    questionLength: props.config.questions.length,
    correctAnswers: 0,
    feedback: false,
    resText: "",
    selectedAnswer: null,
    submitBtnIsDisabled: true,
    isCorrect: "",
    storeId: "",
    answerObj: {
      correctId: "",
      queId: "",
    },
    isSelected: false,
    attempts: 0,
    ariaLiveArray: [],
    updateContext: (contextUpdates) => {
      setContextInfo((currentContextInfo) => {
        return {
          ...currentContextInfo,
          ...contextUpdates,
        };
      });
    },
  };

  // Values that don't need to be updated
  const [configInfo] = useState(configInformation);
  // Values that often get updated
  const [contextInfo, setContextInfo] = useState(contextInformation);

  return (
    <MultipleChoiceConfig.Provider value={configInfo}>
      <MultipleChoiceContext.Provider value={contextInfo}>
        {props.children}
      </MultipleChoiceContext.Provider>
    </MultipleChoiceConfig.Provider>
  );
}
