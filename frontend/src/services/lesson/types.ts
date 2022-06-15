import { RawLesson, Student } from "@/store/modules/lesson/types";
import { AxiosResponse } from "axios";

export type AxiosRawLessons = AxiosResponse<{ lessons: RawLesson[] }>;

export type AxiosStudent = AxiosResponse<Student>;

export type AxiosLogWithAccepted = AxiosResponse<LessonLog>;

export interface LessonLog extends LessonIds {
  childLogs: Log<any>[];
  createdBy: string;
}

export interface Log<T = unknown> extends LessonIds {
  createdBy: string;
  createdAt: string;
  details: T;
  id: number;
  type: RequestType;
}

export interface LessonIds {
  lessonId: number;
  logId: number;
}

export type AxiosLessonIds = AxiosResponse<LessonIds>;

type RequestType = "CREATED" | "OFFER" | "ACCEPTED" | "CLOSED";

export type AxiosInit = AxiosResponse<LessonIds>;
