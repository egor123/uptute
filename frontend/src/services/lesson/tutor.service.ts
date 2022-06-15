import { apiRequest } from "@/services/api.service.js";
import { RequestMethod } from "@/store/modules/lesson/types";
import {
  AxiosLogWithAccepted,
  AxiosLessonIds,
  AxiosRawLessons,
  AxiosStudent,
  AxiosInit,
} from "./types";

const request = (method: RequestMethod, url: string, data?: object) =>
  apiRequest({ method, urlEnd: url, data });

export const sendOffer = (logId: number): Promise<AxiosLessonIds> =>
  request("post", `/lessons/logs/${logId}/offer`);

export const cancelOffer = (offerLogId: number): Promise<AxiosLessonIds> =>
  request("post", `/lessons/logs/${offerLogId}/close`);

export const getRawLessons = (): Promise<AxiosRawLessons> =>
  request("get", "/lessons/open");

export const getStudent = (uuid: string): Promise<AxiosStudent> =>
  request("get", `/account/${uuid}/student`);

export const getLogWithAccepted = (
  offerLogId: number
): Promise<AxiosLogWithAccepted> =>
  request("get", `/lessons/logs/${offerLogId}/accepted`);

export const initConference = (
  acceptedLogId: number,
  roomId: string
): Promise<AxiosInit> =>
  request("post", `/lessons/logs/${acceptedLogId}/init`, { zoomLink: roomId });
