import { apiRequest, isJwtExpired } from "@/services/api.service.js";
import router from "@/router";
import axios from "axios";
import ConferenceMain from "@/store/modules/conference/main";

import store from "@/store";
import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";

@Module({ dynamic: true, store, name: "studentLesson", namespaced: true })
export class StudentLesson extends VuexModule {
  state = "idle";
  info = {};
  lessonId = "";
  logId = "";
  tutors = [];
  vm: null | Vue = null;

  // @Mutation
  // mutate({ name, val }) {
  //   this[name] = val;
  // }

  // @Action
  // async request({ info, vm }) {
  //   this.mutate({ name: "state", val: "initializing" });
  //   this.mutate({ name: "vm", val: vm });
  //   info.tutors = [];
  //   this.mutate({ name: "info", val: info });
  //   const bool = await initialize(this);
  //   if (!bool) return false;
  //   loop(this);
  //   return true;
  // }

  // @Action
  // async rejectOffer({ offerLogId }) {
  //   const res = await rejectOffer(this, { offerLogId });
  //   const bool = res && res.statusText === "OK";
  //   if (!bool) alert(this.vm!.$l("choose_a.tutor.fail.reject"));
  //   return bool;
  // }

  // @Action
  // async accept({ offerLogId }) {
  //   const res = await accept(this, { offerLogId });
  //   if (!res) {
  //     alert(this.vm!.$l("choose_a.tutor.fail.accept"));
  //     return;
  //   }
  //   this.mutate({ name: "acceptedLogId", val: res.data.logId });
  //   this.mutate({ name: "state", val: "accepted" });
  // }

  // @Action
  // async deleteLesson() {
  //   this.mutate({ name: "state", val: "idle" });
  //   return await deleteLesson(this);
  // }
}

export default getModule(StudentLesson);

// async function loop(context) {
//   switch (context.state) {
//     case "listening":
//       await getOffers(context);
//       break;
//     case "accepted":
//       await listenForInit(context);
//       break;
//     case "idle":
//     default:
//       return;
//   }
//   await new Promise((r) => setTimeout(r, 1000));
//   loop(context);
// }

// async function initialize(context) {
//   let data = await postData(context);
//   if (!exitIfUndefined(context, { data, alertName: "init" })) return false;

//   context.mutate({ name: "lessonId", val: data.lessonId });
//   context.mutate({ name: "logId", val: data.logId });
//   context.mutate({ name: "state", val: "listening" });

//   return true;

//   async function postData(context) {
//     let data = context.info;
//     return await apiRequest({
//       method: "post",
//       urlEnd: "/lessons/create",
//       data,
//     }).then((r) => r?.data);
//   }
// }

// async function getOffers(context) {
//   const offerLogs = await getOfferLogs(context);
//   if (!exitIfUndefined(context, { data: offerLogs, alertName: "offers" }))
//     return;
//   const tutors = await getTutorsDetails({ offerLogs });
//   // handle undefined values of tutor
//   console.log(tutors);
//   context.mutate({ name: "tutors", val: tutors });

//   async function getOfferLogs(context) {
//     return await apiRequest({
//       method: "get",
//       urlEnd: "/lessons/logs/" + context.logId + "/offer",
//     }).then((r) => r.data?.childLogs?.map((obj) => obj));
//   }
//   async function getTutorsDetails({ offerLogs }) {
//     return await axios.all(offerLogs.map((offerLog) => getObj(offerLog)));
//     // here should be axios.all request for tutor info
//     async function getObj(offerLog) {
//       const details = await requestDetails(offerLog.createdBy)
//         .then((r) => r.data)
//         .then((r) => hardcodeDetails(r));
//       return { details, offerLog: offerLog.id };
//       async function requestDetails(tutorUUID) {
//         return await apiRequest({
//           method: "get",
//           urlEnd: `/account/${tutorUUID}/tutor`,
//         });
//       }
//       function hardcodeDetails(details) {
//         details.pph = 12;
//         details.hours = 194;
//         details.rating = 3.6;
//         details.comments = 3;
//         return details;
//       }
//     }
//   }
// }
// async function rejectOffer(context, { offerLogId }) {
//   return await apiRequest({
//     method: "post",
//     urlEnd: "/lessons/logs/" + offerLogId + "/close",
//   });
// }

// async function deleteLesson(context) {
//   console.log("delete");
//   console.log(context.logId);
//   return await apiRequest({
//     method: "post",
//     urlEnd: "/lessons/logs/" + context.logId + "/close",
//   });
// }

// async function accept(context, { offerLogId }) {
//   return await apiRequest({
//     method: "post",
//     urlEnd: "/lessons/logs/" + offerLogId + "/accept",
//   });
// }

// async function listenForInit(context) {
//   const getInitRes = await getRequest(context);
//   if (!stopIfUndefined({ data: getInitRes })) return;
//   const initLog = getInitLog(getInitRes);
//   if (initLog) {
//     context.mutate({ name: "state", val: "conference" });
//     enterRoom(initLog);
//   }
//   return;

//   async function getRequest(context) {
//     return await apiRequest({
//       method: "get",
//       urlEnd: "/lessons/logs/" + context.acceptedLogId + "/init",
//     });
//   }
//   function stopIfUndefined({ data }) {
//     if (!data) {
//       alert(context.vm.$l("choose_a.tutor.fail.conference"));
//       context.mutate({ name: "state", val: "listening" });
//     }
//     return data;
//   }
//   function getInitLog(getInitRes) {
//     return getInitRes.data?.childLogs.find(
//       (childLog) => childLog.type === "INIT"
//     );
//   }
//   function enterRoom(initLog) {
//     const conferenceId = initLog.details;
//     router.push({ path: "conference" });
//     console.log("!!!", conferenceId);
//     ConferenceMain.init({ isCaller: false, id: conferenceId });
//   }
// }

// function exitIfUndefined(context, { data, alertName }) {
//   const jwt = JSON.parse(sessionStorage.getItem("user")).jwt;
//   if (isJwtExpired(jwt)) context.mutate({ name: "state", val: "idle" });
//   else if (!data && context.logId != "") {
//     alert(context.vm.$l(`choose_a.tutor.fail.${alertName}`));
//     context.deleteLesson();
//     router.go(-1);
//   }
//   return data;
// }
