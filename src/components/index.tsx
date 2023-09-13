import React from "react";
import { ShowEvent, HideEvent, Placement } from "./types";
import Tooltip from "./toolTip";

function ToolTip() {
  return (
    <>
      {Object.entries(ShowEvent).map(([key, value]) => {
        return Object.entries(HideEvent).map(([hideKey, hideValue]) => {
          return (
            <>
              <Tooltip
                placement={Placement.RIGHT}
                showEvent={value}
                hideEvent={hideValue}
                content="Testing"
              >
                <p />
              </Tooltip>
            </>
          );
        });
      })}
    </>
  );
}

export default ToolTip;
