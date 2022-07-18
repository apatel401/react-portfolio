import React from "react";
import { useState, createContext, useRef } from "react";
import Announcer from "./Announcer";

export const SortingTableContext = createContext();

export default function ProviderComponent(props) {
	const fontSizeMain = { fontSize: props.config.fontSizeMain };
	const fontSizeHeading = { fontSize: props.config.fontSizeHeading };
	// eslint-disable-next-line
	const cardRefs = useRef(JSON.parse(JSON.stringify(props.config.cards)).map(() => useRef()));
	const categoryRefs = useRef(
		// eslint-disable-next-line
		JSON.parse(JSON.stringify(props.config.categories)).map(() => useRef())
	);
	const trayRef = useRef();

	const QUERY = "(prefers-reduced-motion: reduce)";
	const mediaQueryList = window.matchMedia(QUERY);

	let cardDeck = [...props.config.cards];
	cardDeck.map((card, index) => {
		card.id = index;
		card.categoryPlacedId = -1;
		card.title = card.text.length ? card.text : card.alt;
	});

	const contextInformation = {
		...JSON.parse(JSON.stringify(props.config)),

		cardDeck: cardDeck,
		recycled: false,
		tryAgain: false,
		selectedCardId: null,
		deselectedCardId: false,
		categorySelectedId: null,
		selectedBox: null,
		cardMatchedToCategory: false,
		gameOver: false,
		fontSizeMain: fontSizeMain,
		fontSizeHeading: fontSizeHeading,
		cardRefs: cardRefs,
		categoryRefs: categoryRefs,
		trayRef: trayRef,
		reduceMotion: mediaQueryList.matches,
		ariaLiveArray: [],
		ariaLiveTryAgain: null,
		previousButton: "",
		nextButton: "",		
		updateContext: (contextUpdates) => {
			if (contextUpdates.hasOwnProperty("ariaLiveArray")) {
				setMessage(contextUpdates.ariaLiveArray);
				delete contextUpdates.ariaLiveArray;
			}
			if (Object.keys(contextUpdates).length !== 0) {
				setContextInfo((currentContextInfo) => ({ ...currentContextInfo, ...contextUpdates }));
			}
		},
	};

	const [contextInfo, setContextInfo] = useState(contextInformation);
	const [message, setMessage] = useState([]);

	return (
		<>
			<Announcer message={message} />
			<SortingTableContext.Provider value={contextInfo}>
				{props.children}
			</SortingTableContext.Provider>
		</>
	);
}
