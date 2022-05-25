export interface IsToggled {
  [index: string]: { [index: string]: boolean };
  top: {
    [index: string]: boolean;
    settings: boolean;
    chat: boolean;
  };
  bottom: {
    [index: string]: boolean;
    micOff: boolean;
    camOff: boolean;
    end: boolean;
    screenShare: boolean;
    whiteboard: boolean;
  };
}

export interface Icons {
  [index: string]: string;
  on: string;
  off: string;
}

export interface Axis {
  x: number;
  y: number;
}

export interface Message {
  text: string;
  time: number;
  isSelf: boolean;
}

export interface Rect {
  w: number;
  h: number;
}

export interface Streams {
  local: MediaStream;
  remote: MediaStream;
}

export interface RatioEventPayload {
  isLocal: boolean;
  ratio: number;
}

export interface ButtonToggleEventPayload {
  side: string;
  name: string;
}

export interface Message {
  text: string;
  time: number;
  isSelf: boolean;
}
