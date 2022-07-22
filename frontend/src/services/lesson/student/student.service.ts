import { Info } from "@/store/modules/lesson/student/types";
import { req } from "../base";
import { AxiosIds, AxiosParentLog, AxiosTutorDetails } from "./types";

export default {
  create: (info: Info): Promise<AxiosIds> =>
    req("post", `/lessons/create`, info),
  close: (logId: number): Promise<AxiosIds> =>
    req("post", `/lessons/logs/${logId}/close`),
  fetchOffers: (logId: number): Promise<AxiosParentLog> =>
    req("get", `/lessons/logs/${logId}/offer`),
  fetchTutorDetails: (tutorUuid: string): Promise<AxiosTutorDetails> =>
    req("get", `/account/${tutorUuid}/tutor`),
  acceptOffer: (offerLogId: number): Promise<AxiosIds> =>
    req("post", `/lessons/logs/${offerLogId}/accept`),
  checkConferenceInit: (acceptedLogId: number): Promise<AxiosParentLog> =>
    req("get", `/lessons/logs/${acceptedLogId}/init`),
};
