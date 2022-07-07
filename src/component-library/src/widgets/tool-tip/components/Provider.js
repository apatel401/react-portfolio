import React from "react";
import { useState, createContext } from "react";
import Announcer from "./Announcer";

export const TooltipContext = createContext();

export default function ProviderComponent(props) {
	const contextInformation = {
		// ...JSON.parse(JSON.stringify(props.config)),
		announcements: [],
		word: "",
		definition: "",

		updateContext: (contextUpdates) => {
			setContextInfo((currentContextInfo) => ({ ...currentContextInfo, ...contextUpdates }));
		},
	};

	const [contextInfo, setContextInfo] = useState(contextInformation);
	return (
		<TooltipContext.Provider value={contextInfo}>
			{contextInformation.word !== "" && <Announcer message={contextInfo} />}
			{props.children}
		</TooltipContext.Provider>
	);
}
