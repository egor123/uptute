import { firestore } from "@/firebase.js";

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
  [index: string]: MediaStream;
  local: MediaStream;
  remote: MediaStream;
}

export interface RatioEvent {
  isLocal: boolean;
  ratio: number;
}

export interface ButtonToggleEvent {
  side: string;
  name: string;
}

export interface CollectionRef
  extends firestore.CollectionReference<firestore.DocumentData> {}

export interface DocRef
  extends firestore.DocumentReference<firestore.DocumentData> {}

export interface DocSnapshot
  extends firestore.DocumentSnapshot<firestore.DocumentData> {}

export interface QuerySnapshot
  extends firestore.QuerySnapshot<firestore.DocumentData> {}

export interface DocChange
  extends firestore.DocumentChange<firestore.DocumentData> {}

export interface DocData extends firestore.DocumentData {}

export interface InitParams {
  isCaller: boolean;
  id?: string;
}
export interface MediaTrackToStream {
  source: MediaStream;
  isVideo: boolean;
  isLocal: boolean;
}
export interface PeerConnectionEvent {
  // TODO temporary => delete
  name: string;
  log: {
    pre: string;
    name: string;
  };
}

export interface TrackToPC {
  source: MediaStream;
  isVideo: boolean;
}

export interface SaveMessage {
  text: string;
  isSelf: boolean;
}

export interface SetDataChannelListeners {
  onMessage: Function;
}

export interface FailedToJoin {
  path?: string;
  err: string;
}

export interface ReplaceTrack {
  isVideo: boolean;
  newTrack: MediaStreamTrack;
}

export interface RemoveTrackFromStream {
  isVideo: boolean;
  isLocal: boolean;
}
