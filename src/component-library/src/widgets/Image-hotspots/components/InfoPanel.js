import React, { useEffect, useContext, useRef } from "react";
import {
  InteractiveWrapperConfig,
  InteractiveWrapperContext,
} from "./Provider";
function InfoPanel() {
  const config = useContext(InteractiveWrapperConfig);
  const context = useContext(InteractiveWrapperContext);
  const infoRef = useRef(null);

  useEffect(() => {
    context.updateContext({ infoPanelRef: infoRef });
  }, [infoRef]);

  return (
    <div
      ref={infoRef}
      className="content-wrapper"
      // style={{ maxHeight: context.newDimensions.height + 40 + "px" }}
    >
      {!context.areaId && context.areaId !== 0 ? (
        <div className="info-text"><p style={{ fontStyle: "italic" }}>{config.instructions}</p></div>
      ) : (
        <>
        <div className="info-text">
          <p class="h4">{config.areas[context.areaId].name}</p>
          <p>{config.areas[context.areaId].areaDetails[0]}</p>
        </div>
        {/* If there is img src data, presented the area-img div. If not, null */}
        {config.areas[context.areaId].areaDetails[1] ? 
          <>
          <div className="area-img">
            <img
              src={config.areas[context.areaId].areaDetails[1]}
              alt={config.areas[context.areaId].areaDetails[2]}
            />
          </div>  
          <span className="sr-only">
            End of {config.areas[context.areaId].name}, press tab to go to the
            next section.
          </span>
          </>     
        : <span className="sr-only">
        End of {config.areas[context.areaId].name}, press tab to go to the
        next section.
      </span>} 
          
        </>
      )}
    </div>
  );
}

export default InfoPanel;
