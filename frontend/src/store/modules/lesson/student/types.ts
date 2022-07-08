import { language, subject } from "@/types";
import { Details } from "@/components/account/types";

export type Phase =
  | "idle"
  | "initializing"
  | "accepted"
  | "listening"
  | "conference";

export interface Info {
  // Student info
  name: string;
  grade: Details.Grade;
  // Lesson info
  subject: subject;
  topic: string;
  details: string;
  imgs: string[];
  // Tutor requirements
  age: [number, number];
  languages: language[];
  price: [number, number];
}

export interface RequestIds {
  lessonId: number;
  logId: number;
}

export interface ParentLog extends Log {
  lessonId: number;
  logId: number;
  childLogs: ChildLog[];
}

export interface ChildLog<T = any> extends Log {
  id: number;
  type: LogType;
  createdAt: "string";
  details: T;
}

interface Log {
  createdBy: "string";
}

type LogType = "OFFER" | "INIT"; // TODO finish and locate to higher level

export interface TutorDetails {
  age: number;
  firstName: string;
  lastName: string;
  uuid: string;
}

export interface OfferDetails extends TutorDetails {
  pph: number;
  hours: number;
  rating: number;
  comments: number;
}
export interface FetchTutorDetails {
  details: OfferDetails;
  offerLog: number;
}

export interface AcceptedOffer {
  ids: { log: number };
}
