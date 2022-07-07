import React, { useContext } from "react";
import { MultipleChoiceConfig, MultipleChoiceContext } from "./Provider";

function SubmitButton() {
	
	const context = useContext(MultipleChoiceContext);
	const config = useContext(MultipleChoiceConfig);
    const checkedAns = config.questions[context.questionIndex].answerOptions.filter((obj) => obj.checked === true).length > 0  
	function handleClick(e) {
		e.preventDefault();
		if(context.feedback){
			return
		}
		context.updateContext({
			feedback: true
		})
		
	}

	return (
		<div className="submit-btn">
			<button
			style={{display: context.feedback ? "none" : ""}}
				aria-label={ context.questionIndex === context.questionLength - 1 ? "submit answers and get your feedback" : "submit answer and get your feedback" }
				onClick={handleClick}
				disabled={context.submitBtnDisabled || !checkedAns}
			>
				Soumettre
			</button>
		</div>
	);
}

export default SubmitButton;
