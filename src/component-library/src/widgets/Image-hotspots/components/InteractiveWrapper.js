import React, { useContext, useRef } from "react";
import { InteractiveWrapperConfig } from './Provider';
import Image from "./Image";
import Map from "./Map";
import InfoPanel from "./InfoPanel";
import SkipLink from "../../SkipLink";

function InteractiveWrapper() {
  const config = useContext(InteractiveWrapperConfig);
const main = useRef(null);
  return (
    <div className="image-hotspots-container">
    <div className="interactive-wrapper" ref={main}>
      <SkipLink
        elemOrSec={"tfo"}
        section={"start"}
        iloName={"image-hotspots"}
        instanceId={config.id}
        text={config.iloStartText}
        linkText={config.iloStartLink}
      />
      <div className="img-content-wrapper">
        <div className="img-wrapper">
          <Image />
          <Map />
        </div>
        <InfoPanel />
      </div>
      <SkipLink
        elemOrSec={"tfo"}
        section={"end"}
        iloName={"image-hotspots"}
        instanceId={config.id}
        text={config.iloEndText}
        linkText={config.iloEndLink}
      />
    </div>
    </div>
  );
}

export default InteractiveWrapper;