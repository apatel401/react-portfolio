import React from "react";

const Announcer = React.memo((props) => {
	let messageContent = props.message;

	const message = () => {
		switch (messageContent.announcements[0]) {
			case "focus":
				return `You're on a definition tooltip. Select to view definition for ${messageContent.word}.`;
			case "open":
				return `Tooltip open, content reads ${messageContent.definition.substring(
					0,
					50
				)}, Select to close tooltip.`;
			case "close":
				return `Tooltip closed.`;
			default:
				return "";
		}
	};

	// aria-live region for announcements
	return (
		<div role="alert" aria-live="assertive" aria-atomic="true" className="sr-only" tabindex="-1">
			{message()}
		</div>
	);
});
export default Announcer;
