import React, { useContext, useRef } from "react";
import Answer from "./Answer";
import { MultipleChoiceConfig, MultipleChoiceContext } from "./Provider";
import SubmitButton from "./SubmitButton";
import Resources from "../Resources";

function Question({ id, question, options, imgSrc, imgAlt , index }) {
  // get context & config
  const context = useContext(MultipleChoiceContext);
  const config = useContext(MultipleChoiceConfig);
  const optionsRef = useRef(null)

  //Map through answers
  const _options = options.map((answer, index) => {
    return (
      <Answer
        id={`${context.questionIndex}-a${index}-${config.id}`}
        answer={answer.answerText}
        index={index}
        isCorrect={answer.isCorrect}
        responseText={answer.responseText}
      />
    );
  });
  const handleTryAgain = (e) => {
    e.preventDefault();
    const scrollPosition =
    optionsRef.current.getBoundingClientRect().top + window.pageYOffset;
  window.scrollTo({ top: scrollPosition, behavior: "smooth" });
    if (context.attempts < 2) {
      context.updateContext({
        questionIndex: context.questionIndex,
        feedback: false,
        attempts: context.attempts + 1,
        submitBtnIsDisabled: true,
      });
    }
      if(context.storeId){
        context.updateContext({
          submitBtnIsDisabled: false,
        });
      }
    }

  const handleNext = (e) => {
    e.preventDefault();
    if (context.questionIndex < context.questionLength - 1) {
      context.updateContext({
        questionIndex: context.questionIndex + 1,
        feedback: false,
        submitBtnIsDisabled: true,
        attempts: 0
      });
    } 
  };

  const handlePrev = (e) => {
    e.preventDefault();
    if (context.questionIndex <= context.questionLength - 1) {
      context.updateContext({
        questionIndex: context.questionIndex - 1,
        feedback: false,
        submitBtnIsDisabled: true,
        attempts: 0
      });
      context.storeId ?
        context.updateContext({submitBtnIsDisabled: false}) : context.updateContext({ submitBtnIsDisabled: true})
      }
    }

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
              {config.instructions}
            </p>
            <div
              className="image-container"
              style={
                imgSrc
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
            ref={optionsRef}
          >
            {_options}
            <SubmitButton />
          </div>
          {context.feedback ? (
            <div
              className="arrow"
              style={{
                "--custom-color": context.isCorrect
                  ? "#00BFDF"
                  : !context.isCorrect &&
                    context.attempts < 1 &&
                    !config.trueFalse
                  ? "#FFCC32"
                  : "#ED1556",
              }}
            >
              <div
              role="alert" 
              aria-live="assertive" 
              aria-atomic="true"
              className="mc-feedback"
              style={{
                  borderTop: context.isCorrect
                    ? "20px solid #00BFDF"
                    : !context.isCorrect &&
                      context.attempts < 1 &&
                      !config.trueFalse
                    ? "20px solid #FFCC32"
                    : !context.isCorrect && config.trueFalse
                    ? "20px solid #ED1556"
                    : "20px solid #ED1556",
                }}
              >
                <div className="mc-result-response">
                  <img
                    src={
                      context.isCorrect
                        ? Resources.CorrectIconFeedback
                        : !context.isCorrect &&
                          context.attempts < 1 &&
                          !config.trueFalse
                        ? Resources.TryAgainIconFeedback
                        : Resources.IncorrectIconFeedback
                    }
                    alt=""
                  />
                  <p>
                    {context.isCorrect
                      ? "C'est exact!"
                      : !context.isCorrect &&
                        context.attempts < 1 &&
                        !config.trueFalse
                      ? "Essaie encore!"
                      : "Pas tout à fait!"}
                  </p>
                </div>
                <div className="mc-res-text">
                  <p>{context.resText}</p>
                </div>

                {!context.isCorrect && (
                  <div
                    className="btn-wrapper"
                    style={{
                      display:
                        context.attempts >= 1 || config.trueFalse ? "none" : "",
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
