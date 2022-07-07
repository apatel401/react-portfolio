import React from "react";
import { useState, createContext, useRef } from "react";
import Announcer from "./Announcer";

export const FlashcardsContext = createContext();
export const GlobalFun = createContext();

export default function ProviderComponent(props) {
	const QUERY = "(prefers-reduced-motion: reduce)";
	const mediaQueryList = window.matchMedia(QUERY);

	const contextInformation = {
		...JSON.parse(JSON.stringify(props.config)),

		reduceMotion: mediaQueryList.matches,
		announcements: "",
		current: 0,
		currentCardRef: 0,
		containerRef: useRef(null),
		bottomRef: useRef(null),
		inTransform: false,
		inBottom: false,
		resetFlipped: false,
		isFrontCard: true,
		flipped: null,
		cardStatus: new Array(props.config.items.length).fill(true),

		updateContext: (contextUpdates) => {
			setContextInfo((currentContextInfo) => ({ ...currentContextInfo, ...contextUpdates }));
		},
	};

	const [contextInfo, setContextInfo] = useState(contextInformation);
	return (
		<FlashcardsContext.Provider value={contextInfo}>
			<Announcer message={contextInfo.announcements} />
			{props.children}
		</FlashcardsContext.Provider>
	);
}
