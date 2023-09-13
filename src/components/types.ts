export enum ShowEvent {
  LOAD = "onLoad",
  MOUSE_ENTER = "onMouseEnter",
  CLICK = "onClick",
  HOVER = "onHover",
  NONE = "none",
}

export enum Placement {
  TOP = "top",
  TOP_START = "top-start",
  TOP_END = "top-end",
  RIGHT = "right",
  RIGHT_START = "right-start",
  RIGHT_END = "right-end",
  BOTTOM = "bottom",
  BOTTOM_START = "bottom-start",
  BOTTOM_END = "bottom-end",
  LEFT = "left",
  LEFT_START = "left-start",
  LEFT_END = "left-end",
}

export interface TooltipProps {
  placement: Placement;
  content: React.ReactNode;
  heading?: React.ReactNode;
  children: React.ReactElement<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  dismissText?: string;
  showEvent?: ShowEvent;
  hideEvent?: HideEvent;
  onDismiss?: (byUser: boolean) => void;
  onShow?: () => void;
  tippyProps?: { offset: [number, number] };
  className?: string;
  autoHideIn?: number;
  autoShowIn?: number;
}

export enum HideEvent {
  NONE = "none",
  MOUSE_LEAVE = "onMouseLeave",
  CLICK_OUTSIDE = "onClickOutSide",
  CLICK = "onClick",
}
