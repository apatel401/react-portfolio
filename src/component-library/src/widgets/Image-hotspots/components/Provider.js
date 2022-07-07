import React from 'react';
import { useState, createContext } from "react";
import Announcer from './Announcer';

export const InteractiveWrapperContext = createContext();
export const InteractiveWrapperConfig = createContext();

export default function ProviderComponent(props) {

    const configInformation = {
        ...JSON.parse(JSON.stringify(props.config)),
        id: props.id,
        // Calling updateAnnouncement does not update configInformation
        updateAnnouncement: (announcementUpdate) => {
            setAnnouncementInfo(announcementUpdate);
        }
    }

    const contextInformation = {
        originalDimensions: {},
        newDimensions: {},
        areaId: null,
        infoPanelRef: null,
        imgRef: null,
        canvasRef: null,
        canvasElementRef: null,
        canvasTagRef: null,
        canvasTagElementRef: null,
        updateContext: (contextUpdates) => {
            setContextInfo(currentContextInfo => ({ ...currentContextInfo, ...contextUpdates }));
        },
    }

    // Values that don't need to be updated
    const [configInfo] = useState(configInformation);
    // Values that often get updated
    const [contextInfo, setContextInfo] = useState(contextInformation);
    // updated in configInformation
    const [announcementInfo, setAnnouncementInfo] = useState();


    return (
        <InteractiveWrapperConfig.Provider value={configInfo}>
            { announcementInfo !== "" || announcementInfo !== undefined && <Announcer message={announcementInfo} areas={ configInfo.areas } areaId={ contextInfo.areaId }/>}
            <InteractiveWrapperContext.Provider value={contextInfo}>
                {props.children}
            </InteractiveWrapperContext.Provider>
        </InteractiveWrapperConfig.Provider>
    )
}