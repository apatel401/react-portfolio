import React from 'react';
import { useState, createContext } from "react";

export const FlowchartContext = createContext()

export default function ProviderComponent(props) {


    const QUERY = '(prefers-reduced-motion: reduce)';
    const mediaQueryList = window.matchMedia(QUERY);
  
    const contextInformation = {
        ...JSON.parse(JSON.stringify(props.config)),
        
        announcements: "",
        isMatchCorrect: null,
        defaultWidth: 0,
        defaultHeight: 0,
        width: 0,
        height: 0,
        hiddenCards: [],
        matchedCards: [],

        reduceMotion: mediaQueryList.matches,
        updateContext: (contextUpdates) => {
            setContextInfo(currentContextInfo => ({ ...currentContextInfo, ...contextUpdates }));
        }
    }

    const [contextInfo, setContextInfo] = useState(contextInformation);

    return (
        <FlowchartContext.Provider value={contextInfo}>
                {props.children}
        </FlowchartContext.Provider>
    )
}
