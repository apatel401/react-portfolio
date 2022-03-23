import React from 'react';
import { useState, createContext } from 'react';
// import useLocalStorage from 'use-local-storage'

export const ThemeContext = createContext();

export default function ProviderComponent(props) {
    // const defaultDark = window.matchMedia('(prefer-color-scheme: light)').matches;
    // const theme = useLocalStorage('theme', defaultDark ? 'dark' : 'light')

	const contextInformation = {
        theme: "dark",
        updateContext: (contextUpdates) => {
            setContextInfo(currentContextInfo => ({ ...currentContextInfo, ...contextUpdates }));
        },
	};

	const [ contextInfo, setContextInfo ] = useState(contextInformation);
   

	return (
      <ThemeContext.Provider value={contextInfo}>
         {props.children}
      </ThemeContext.Provider>
	);
}
