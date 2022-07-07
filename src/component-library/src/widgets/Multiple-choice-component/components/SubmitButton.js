import React, { useContext } from "react";
import { MultipleChoiceConfig, MultipleChoiceContext } from "./Provider";

function SubmitButton() {
	
	const context = useContext(MultipleChoiceContext);
	const config = useContext(MultipleChoiceConfig);
	
	function handleClick(e) {
		e.preventDefault();
		if(context.feedback){
			return
		}
		context.updateContext({
			feedback: true,
			SubmitBtnIsDisabled : true
		})
		
	}

	return (
		<div className="submit-btn">
			<button
			style={{display: context.feedback ? "none" : ""}}
				aria-label={"submit answer and get your feedback"}
				onClick={e => handleClick(e)}
				disabled={context.submitBtnIsDisabled}
			>soumettre</button>
		</div>
	);
}

export default SubmitButton;
