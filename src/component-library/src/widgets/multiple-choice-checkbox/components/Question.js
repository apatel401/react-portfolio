import React, { useContext, useState } from "react";
import Answer from "./Answer";
import { MultipleChoiceConfig, MultipleChoiceContext } from "./Provider";
import SubmitButton from "./SubmitButton";
import Resources from "../Resources";

function Question({ id, question, options, imgSrc, imgAlt, index }) {
  // get context & config
  const context = useContext(MultipleChoiceContext);
  const config = useContext(MultipleChoiceConfig);
  const [getAns, setGetAns] = useState([]);
  const [noOfCorrectAns, setNoOfCorrextAns] = useState(options.filter((obj) => obj.isCorrect === true).length)

  //Map through answers
  const _options = options.map((answer, index) => {
    return (
      <Answer
        id={`${context.questionIndex}-a${index}-${config.id}`}
        answer={answer.answerText}
        index={index}
        isCorrect={answer.isCorrect}
        responseText={answer.responseText}
        answerId={answer.answerId}
        checked={answer.checked}
        getAns={getAns}
        setGetAns={setGetAns}
        noOfCorrectAns={noOfCorrectAns}
      />
    );
  });

  const handleTryAgain = (e) => {
    e.preventDefault();
    if (context.attempts < 2) {
      context.updateContext({
        questionIndex: context.questionIndex,
        feedback: false,
        attempts: context.attempts + 1,
        submitBtnIsDisabled: true,
      });
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (context.questionIndex < context.questionLength - 1) {
      setNoOfCorrextAns(
        config.questions[context.questionIndex + 1].answerOptions.filter((obj) => obj.isCorrect === true).length
      )
      context.updateContext({
        questionIndex: context.questionIndex + 1,
        feedback: false,
        submitBtnIsDisabled: true,
        attempts: 0,
      });
    }
    }

  const handlePrev = (e) => {
    e.preventDefault();
    if (context.questionIndex <= context.questionLength - 1) {
      setNoOfCorrextAns(
        config.questions[context.questionIndex - 1].answerOptions.filter((obj) => obj.isCorrect === true).length
      )
      context.updateContext({
        questionIndex: context.questionIndex - 1,
        feedback: false,
        submitBtnIsDisabled: true,
        attempts: 0,
      });
    }
  }

  const correctFeedback =
    context.checkedAnswers == options.filter((obj) => obj.isCorrect === true).length &&
    getAns.filter((obj) => obj.checked === true && obj.isCorrect === true) &&
    getAns.filter((obj) => obj.checked === true && obj.isCorrect === false).length === 0 && 
    context.checkedAnswers === noOfCorrectAns;

  const incompleteCorrectFeedback =
    getAns.filter((obj) => obj.checked && obj.isCorrect === true) &&
    context.attempts < 1 &&
    context.checkedAnswers < options.filter((obj) => obj.isCorrect === true).length
 
  const incorrectFeedback =
    getAns.filter((obj) => obj.checked && obj.isCorrect === false) &&
    context.attempts >= 1 &&
    context.checkedAnswers &&
    noOfCorrectAns

  const incompleteIncorrectFeedback =
    getAns.filter((obj) => obj.checked && obj.isCorrect === false) &&
    context.attempts < 1 

  return (
    <>
      <form key={id} class="multiple-choice-form" name="multiple-choice-form">
      <div
          className="question-num"
          aria-hidden="true"
          style={{ display: config.partofDiscovery === true ? "none" : "flex" }}
        >
          <div className="question-pill">
          <img src={Resources.QueIcon} alt="" />
          <span>
            Question
          </span>
          </div>
        </div>
        <div className="multiple-choice-wrapper">
          <div className="question-container">
            <p className="question" aria-hidden="true">
              {question}
            </p>
            <p
              className="instruction"
              style={
                config.questions[context.questionIndex].questionImg
                  ? { marginBottom: "30px" }
                  : { marginBottom: "40px" }
              }
            >
           {config.instruction}
            </p>
            <div
              className="image-container"
              style={
                config.questions[context.questionIndex].questionImg
                  ? { marginBottom: "0px" }
                  : { display: "none" }
              }
            >
              <img src={imgSrc} alt={imgAlt} />
            </div>
          </div>
          <div
            role="group"
            aria-label={`Question; ${
              context.questionIndex + 1
            } Question Reads; ${question}`}
            aria-activedescendant={`${context.questionIndex}-a-${config.id}`}
            tabIndex={-1}
            className="options-wrapper"
          >
            {_options}
            <SubmitButton />
          </div>
          {context.feedback ? (
            <div
              className="arrow"
              style={{
                "--custom-color": correctFeedback
                  ? "#00BFDF"
                  : incompleteCorrectFeedback || incompleteIncorrectFeedback
                  ? "#FFCC32"
                  : incorrectFeedback
                  ? "#ED1556"
                  : "",
              }}
            >
              <div
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                className="mc-feedback"
                style={{
                  borderTop:
                  correctFeedback
                  ? "20px solid #00BFDF"
                  : incompleteCorrectFeedback || incompleteIncorrectFeedback
                  ? "20px solid #FFCC32"
                  : incorrectFeedback
                  ? "20px solid #ED1556"
                  : "",
                }}
              >
                <div className="mc-result-response">
                  <img
                    src={
                      correctFeedback
                  ? Resources.CorrectIconFeedback
                  : incompleteCorrectFeedback || incompleteIncorrectFeedback
                  ?  Resources.TryAgainIconFeedback
                  : incorrectFeedback
                  ? Resources.IncorrectIconFeedback
                  : ""
                    }
                    alt=""
                  />
                  <p>
                 { correctFeedback
                  ? "C'est exact!"
                  : incompleteCorrectFeedback || incompleteIncorrectFeedback
                  ?  "Essaie encore!"
                  : incorrectFeedback
                  ? "Pas tout à fait!"
                  : ""}
                  </p>
                </div>
                <div className="mc-res-text">
                  { correctFeedback
                  ? <p>{config.questions[context.questionIndex].correctFeedback}</p>
                  : incompleteCorrectFeedback || incompleteIncorrectFeedback
                  ?  <p>{config.questions[context.questionIndex].tryAgainFeedback}</p>
                  : incorrectFeedback
                  ? <p>{config.questions[context.questionIndex].incorrectFeedback}</p>
                  : ""}
                </div>

                { (incompleteCorrectFeedback || incompleteIncorrectFeedback) && (
                  <div
                    className="btn-wrapper"
                    style={{
                      display:
                        context.attempts >= 1 || correctFeedback ? "none" : "",
                    }}
                  >
                    <div className="try-again-btn">
                      <button onClick={handleTryAgain} className="tryAgain">
                        <img src={Resources.TryAgainIconSVG} alt="" />
                        <span>Essaie encore!</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            ""
          )}
          <div
            className="action-btn"
            style={{
              display: config.partofDiscovery === true ? "none" : "flex",
            }}
          >
            <button
              onClick={handlePrev}
              className="btn-prev"
              disabled={context.questionIndex === 0}
            >
              Précédent
            </button>
            <p className="current-slide">{context.questionIndex + 1} sur {context.questionLength}</p>
            <button
              onClick={handleNext}
              className="btn-next"
              disabled={context.questionIndex + 1 === context.questionLength}
            >
              Suivant
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Question;
