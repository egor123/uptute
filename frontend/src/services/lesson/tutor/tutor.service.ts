import { req } from "../base";
import {
  AxiosLogWithAccepted,
  AxiosLessonIds,
  AxiosRawLessons,
  AxiosStudent,
  AxiosInit,
} from "./types";

export default {
  sendOffer: (logId: number): Promise<AxiosLessonIds> =>
    req("post", `/lessons/logs/${logId}/offer`),

  cancelOffer: (offerLogId: number): Promise<AxiosLessonIds> =>
    req("post", `/lessons/logs/${offerLogId}/close`),

  getRawLessons: (): Promise<AxiosRawLessons> => req("get", "/lessons/open"),

  getStudent: (uuid: string): Promise<AxiosStudent> =>
    req("get", `/account/${uuid}/student`),

  getLogWithAccepted: (offerLogId: number): Promise<AxiosLogWithAccepted> =>
    req("get", `/lessons/logs/${offerLogId}/accepted`),

  initConference: (acceptedLogId: number, roomId: string): Promise<AxiosInit> =>
    req("post", `/lessons/logs/${acceptedLogId}/init`, { zoomLink: roomId }),
};
