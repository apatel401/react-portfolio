import React, { useContext } from "react";
import { FlashcardsContext } from "./Provider";

const Announcer = React.memo((props) => {
	// With react memo, react memorizes the the result
	// Meaning that if the new props are the same then it will skip the next rendering
	// If the contents of the props changes, then react will re-render

	let messageContent = props.message;
	const context = useContext(FlashcardsContext);
	// console.log("context.currentCardRef ", context.currentCardRef);

	const currentTitle = context.items[context.currentCardRef];
	const cardTitle = currentTitle.title;
	const _headerFront = currentTitle.headerValueFront ? currentTitle.headerValueFront : "";
	const _headerBack = currentTitle.headerValueBack ? currentTitle.headerValueBack : "";
	const _altFront = currentTitle.textValueFront ? currentTitle.textValueFront : "";
	const _altBack = currentTitle.textValueBack ? currentTitle.textValueBack : "";
	const _imageFront = currentTitle.imgFront ? currentTitle.imgFront[1] : "";
	const _imageBack = currentTitle.imgBack ? currentTitle.imgBack[1] : "";

	const message = () => {
		switch (messageContent) {
			case "current":
				return `Current card number ${context.currentCardRef + 1} of ${
					context.items.length
				}. You are on the ${
					context.cardStatus[context.currentCardRef]
						? `front card. ${_imageFront} ${_headerFront} ${_altFront}`
						: `back card. ${_imageBack} ${_headerBack} ${_altBack}`
				} `;
			case "flipping":
				return `Card flipped.`;
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
