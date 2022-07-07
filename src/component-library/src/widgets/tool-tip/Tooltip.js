import React from "react";
import TooltipWrapper from "./components/TooltipWrapper";
import ProviderComponent from "./components/Provider";
import "../../../styles/tool-tip/style.scss";

function Tooltip({ definition, direction = "up", children }) {
  return (
    <span className="tooltip-container">
    <ProviderComponent>
      <TooltipWrapper
        definition={definition}
        direction={direction}
        children={children}
      />
    </ProviderComponent>
    </span>
  );
}

export default Tooltip;
