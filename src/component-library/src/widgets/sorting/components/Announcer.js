import React from "react";

const Announcer = React.memo((props) => {
	let messageContent = props.message;

	const message = () => {
		switch (messageContent[0]) {
			case "cardSelected":
				return `${messageContent[1]} card selected`;
			case "cardMatchedToCategory":
				return `You are Correct.`;
			case "cardMovedToCategory":
				return `${messageContent[1]} in ${messageContent[2]} category`;
			case "tryAgain":
				return `Incorrect. ${messageContent[1]} should not be in ${messageContent[2]} category.`;
			case "recycled":
				return `${messageContent[1]} in ${messageContent[2]} moved back to tray`;
			case "categoryToCategory":
				return `Card moved from ${messageContent[1]} category to ${messageContent[2]} category.`;
			case "cardSkipped":
				return `Card skipped. Card option: ${messageContent[2][0]} of ${messageContent[2][1]}. Card reads: ${messageContent[1]}`;
			case "Card Option":
				return messageContent[1];
			case "Selected":
				return messageContent[1];
			case "Selected in Category":
				return messageContent[1];
			default:
				return "";
		}
	};

	// aria-live region for announcements
	return (
		<div role="alert" aria-live="assertive" aria-atomic="true" className="sr-only">
			{message()}
		</div>
	);
});
export default Announcer;
