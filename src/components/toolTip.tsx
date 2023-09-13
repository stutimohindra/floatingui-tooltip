import { useState } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  safePolygon,
  useClick,
} from "@floating-ui/react";

import "./styles";
import React from "react";
import { HideEvent, ShowEvent, TooltipProps } from "./types";

function Tooltip({
  placement,
  showEvent = ShowEvent.MOUSE_ENTER,
  hideEvent = HideEvent.MOUSE_LEAVE,
}: TooltipProps) {
  const [isOpen, setIsOpen] = useState(showEvent === ShowEvent.LOAD);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: "start",
      }),
      shift(),
    ],
  });
  const hover = useHover(context, {
    move: false,
    enabled: !(
      (showEvent === ShowEvent.LOAD &&
        !isOpen &&
        hideEvent === HideEvent.MOUSE_LEAVE) ||
      (showEvent === ShowEvent.CLICK && hideEvent === HideEvent.MOUSE_LEAVE) ||
      hideEvent === HideEvent.CLICK_OUTSIDE ||
      hideEvent === HideEvent.CLICK ||
      hideEvent === HideEvent.NONE ||
      showEvent === ShowEvent.NONE
    ),
  });

  const dismiss = useDismiss(context, {
    enabled: hideEvent === HideEvent.CLICK_OUTSIDE,
    outsidePress: hideEvent === HideEvent.CLICK_OUTSIDE,
    referencePress: !(hideEvent === HideEvent.CLICK_OUTSIDE),
  });

  const click = useClick(context, {
    enabled: showEvent === ShowEvent.CLICK || hideEvent === HideEvent.CLICK,
    toggle: hideEvent === HideEvent.CLICK,
  });

  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    click,
    dismiss,
    role,
  ]);

  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps({
          onMouseLeave() {
            if (
              showEvent === ShowEvent.CLICK &&
              hideEvent === HideEvent.MOUSE_LEAVE
            ) {
              setIsOpen(false);
            }
          },
          onMouseEnter() {
            if (
              (showEvent === ShowEvent.HOVER ||
                showEvent === ShowEvent.MOUSE_ENTER) &&
              !isOpen
            ) {
              setIsOpen(true);
            }
          },
        })}
      >
        <button>
          Show: {showEvent} Hide:{hideEvent}
        </button>
        <FloatingPortal>
          {isOpen && (
            <div
              className="Tooltip"
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              I'm a tooltip!
            </div>
          )}
        </FloatingPortal>
      </div>
    </>
  );
}

export default Tooltip;
