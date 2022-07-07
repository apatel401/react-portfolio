import React, { useContext } from "react";
import { MultipleChoiceConfig, MultipleChoiceContext } from "./Provider";
import Resources from "../Resources";

function Answer({ id, answer, responseText, isCorrect, index }) {
  const config = useContext(MultipleChoiceConfig);
  const context = useContext(MultipleChoiceContext);
  function handleOnChange(id) {
    context.updateContext({
      submitBtnIsDisabled: false,
      feedback: false,
      resText: responseText,
      isCorrect: isCorrect,
      storeId: id,
    });
  }

  return (
    <>
      <label
        style={{
          border:
            context.feedback && !context.isCorrect && context.storeId === id
              ? "2px solid rgb(236, 24, 86)"
              : (context.feedback && context.attempts >= 1 && isCorrect) ||
                (context.feedback && config.trueFalse && isCorrect)
              ? "2px solid #00bfdf"
              : context.feedback && context.isCorrect && context.storeId === id
              ? "2px solid #00bfdf"
              : "",
          boxShadow: context.feedback && context.storeId === id ? "none" : "",
          opacity:
            (context.feedback && isCorrect && context.attempts >= 1) ||
            (context.feedback && isCorrect && config.trueFalse)
              ? "1"
              : (context.feedback &&
                  !context.isCorrect &&
                  context.storeId !== id) ||
                (context.feedback &&
                  context.isCorrect &&
                  context.storeId !== id)
              ? "0.5"
              : context.attempts < 1 &&
                context.isCorrect &&
                context.storeId === id
              ? "1"
              : "",
        }}
        className={
          context.storeId === id ? "answer-label selected" : "answer-label"
        }
        disabled={context.feedback && context.attempts <= 1 ? "true" : ""}
        for={id}
      >
        <input
          id={id}
          type="radio"
          name="answer"
          className="answer"
          onChange={() => handleOnChange(id)}
          aria-labelledby={`description-${id}`}
          disabled={context.feedback}
          onKeyPress={(e) => e.key === "Enter" && e.preventDefault()}
        />
        {context.feedback && context.isCorrect && context.storeId === id ? (
          <div style={{ background: "#00bfdf" }} className="feedback-wrapper">
            <img
              src={Resources.CorrectIconSVG}
              alt=""
              className="mc-feedback-img"
            />
          </div>
        ) : (context.feedback && context.attempts >= 1 && isCorrect) ||
          (context.feedback && config.trueFalse && isCorrect) ? (
          <div style={{ background: "#00bfdf" }} className="feedback-wrapper">
            <img
              src={Resources.CorrectIconSVG}
              alt=""
              className="mc-feedback-img"
            />
          </div>
        ) : context.feedback && !context.isCorrect && context.storeId === id ? (
          <div style={{ background: "#EC1856" }} className="feedback-wrapper">
            <img
              src={Resources.IncorrectIconSVG}
              className="mc-feedback-img"
              alt=""
            />
          </div>
        ) : (
          <div className="radio-button"></div>
        )}
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
