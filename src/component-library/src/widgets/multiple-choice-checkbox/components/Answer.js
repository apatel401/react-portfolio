import React, { useContext, useState } from "react";
import { MultipleChoiceConfig, MultipleChoiceContext } from "./Provider";
import Resources from "../Resources";

function Answer({ id, answer, responseText, isCorrect, index, answerId, getAns, setGetAns, checked, noOfCorrectAns }) {
  const config = useContext(MultipleChoiceConfig);
  const context = useContext(MultipleChoiceContext);
  // const [checked, setChecked] = useState(false);
 
  function handleOnChange(answerId) {
    const updatedItems = [...config.questions[context.questionIndex].answerOptions];
    const itemId = updatedItems.findIndex((obj) => obj.answerId === answerId);
    updatedItems[itemId].checked = !updatedItems[itemId].checked;
    setGetAns(updatedItems)
    const checkedItems = getAns.filter((obj) => obj.checked === true);
    
    context.updateContext({
      submitBtnIsDisabled: false,
      feedback: false,
      resText: responseText,
      isCorrect: isCorrect,
      storeId: [...context.storeId, answerId],
      checkedAnswers: checkedItems.length
    });
  }


  return (
    <>
      <label
        style={{
          border:
            context.feedback && !isCorrect && checked
              ? "2px solid rgb(236, 24, 86)"
              : context.feedback && context.attempts >= 1 && isCorrect
              ? "2px solid #00bfdf"
              : context.feedback && isCorrect && checked
              ? "2px solid #00bfdf"
              : context.feedback && getAns.filter((obj) => obj.checked === true).length < noOfCorrectAns 
              && context.attempts < 1 ? "2px solid #ffcc32"
              : "",
          boxShadow: context.feedback && checked ? "none" : "",
          opacity:
            (context.feedback && isCorrect && context.attempts >= 1) || (context.feedback && getAns.filter((obj) => obj.checked === true).length < noOfCorrectAns && context.attempts < 1)
              ? "1"
              : (context.feedback && 
                  !checked) 
              ? "0.5"
              : context.attempts < 1 &&
                isCorrect &&
                checked
              ? "1"
              : "",
        }}
        
        className={
          checked ? "answer-label selected" : "answer-label"
        }
        disabled={context.feedback && context.attempts <= 1 ? "true" : ""}
        for={id}
      >
        <input
          id={id}
          type="checkbox"
          name="answer"
          className="answer"
          checked={checked}
          onChange={() => handleOnChange(answerId)}
          aria-labelledby={`description-${id}`}
          disabled={context.feedback}
          onKeyPress={(e) => e.key === "Enter" && e.preventDefault()}
        />
        {context.feedback && isCorrect && checked ? (
          <div style={{ background: "#00bfdf" }} className="feedback-wrapper">
            <img
              src={Resources.CorrectIconSVG}
              alt=""
              className="mc-feedback-img"
            />
          </div>
        ) : context.feedback && context.attempts >= 1 && isCorrect ? (
          <div style={{ background: "#00bfdf" }} className="feedback-wrapper">
            <img
              src={Resources.CorrectIconSVG}
              alt=""
              className="mc-feedback-img"
            />
          </div>
        ) : context.feedback && !isCorrect && checked ? (
          <div style={{ background: "#EC1856" }} className="feedback-wrapper">
            <img
              src={Resources.IncorrectIconSVG}
              className="mc-feedback-img"
              alt=""
            />
          </div>
        ) : context.feedback && getAns.filter((obj) => obj.checked === true).length < noOfCorrectAns && context.attempts < 1 ?  
        <div style={{ background: "#ffcc32" }} className="feedback-wrapper">
        <img
          src={Resources.IncompleteIcon}
          className="mc-feedback-img"
          alt=""
        />
        </div> : 
          (<div className="checkbox"></div>)
        }
        <p
          className="answer-text"
          aria-hidden="true"
          id={`description-${id}`}
          style={{}}
        >
          {answer}
        </p>
      </label>
    </>
  );
}

export default Answer;
