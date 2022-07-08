import { vm } from "@/main";
import { isJwtExpired } from "@/services/api.service.js";
import Module from "@/store/modules/lesson/student/module";
import server from "@/services/lesson/student/student.service";
import axios from "axios";
import { ChildLog, FetchTutorDetails, Info, RequestIds } from "./types";
import { AxiosIds } from "@/services/lesson/student/types";
import ConferenceMain from "@/store/modules/conference/main";

const exports = {
  exitIfFalsy: (bool: boolean, alertName: string): boolean => {
    const user: string | null = sessionStorage.getItem("user");
    if (!user || isJwtExpired(JSON.parse(user).jwt)) Module.deleteLesson();
    else if (!bool) {
      alert(vm.$l(`choose_a.tutor.fail.${alertName}`));
      Module.deleteLesson();
      vm.$router.go(-1);
    }
    return bool;
  },

  create: (info: Info | null): Promise<RequestIds> | null =>
    info == null ? null : server.create(info).then((r) => r.data),

  close: (logId: number): Promise<AxiosIds> => {
    if (logId == 0) throw new Error(`Can't close the log. LogId is ${logId}`);
    return server.close(logId);
  },

  fetchOffers: (logId: number): Promise<ChildLog[]> =>
    server.fetchOffers(logId).then((r) => r.data?.childLogs),

  fetchTutorsDetails: (offerLogs: ChildLog[]): Promise<FetchTutorDetails[]> => {
    const fetchDeteails = {
      tutors: () => offerLogs.map((l) => fetchDeteails.tutor(l)),
      tutor: (offerLog: ChildLog) =>
        server
          .fetchTutorDetails(offerLog.createdBy)
          .then((r) => r.data)
          // TODO all of this details should be pulled from server
          .then((d) => ({ ...d, pph: 9, hours: 6, rating: 3, comments: 3 }))
          .then((details) => ({ details, offerLog: offerLog.id })),
    };

    return axios.all(fetchDeteails.tutors());
  },

  acceptOffer: async (offerLogId: number): Promise<RequestIds> => {
    const axiosIds = await server.acceptOffer(offerLogId);
    const ids = axiosIds.data;
    if (!ids) alert(vm!.$l("choose_a.tutor.fail.accept"));
    return ids;
  },

  checkConferenceInit: (acceptedLogId: number) =>
    server
      .checkConferenceInit(acceptedLogId)
      .then((axiosParentLog) => axiosParentLog.data.childLogs),

  joinConference: (initLog: ChildLog) => {
    vm.$router.push({ path: "conference" });
    ConferenceMain.init({ isCaller: false, id: initLog.details });
    // TODO has to be an id not a URL
  },
};

export default exports;
