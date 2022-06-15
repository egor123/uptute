export type Phase = "idle" | "listening" | "accepted" | "conference";

export interface Lessons {
  open: Lesson[];
  offered: LessonWithOffer[];
}

export interface Lesson {
  details: LessonDetails;
  logId: number;
  lessonId: number;
  studentUUID: string;
}

export interface PLesson extends Omit<Lesson, "details"> {
  details: LessonInfo;
}

export interface LessonDetails extends Student, LessonInfo {}

export interface LessonInfo {
  subject: string;
  details: string;
  topic: string;
}

export interface Student {
  uuid: string;
  firstName: string;
  lastName: string;
  grade: number;
}

export interface RawLesson extends Omit<Lesson, "details"> {
  details: string;
}

export interface LessonWithOffer extends Lesson {
  offerLogId: number;
}

export interface LessonIds {
  lesson: number;
  log: number;
}

export type RequestMethod = "get" | "post";

export interface ExitIfNull {
  data: unknown;
  name: string;
}
