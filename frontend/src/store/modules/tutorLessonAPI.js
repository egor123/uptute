import { apiRequest } from "@/services/api.service.js";
import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {
      state: "idle",
      userUUID: getUUID(),
      lessons: [],
      offeredLessons: [],
      zoomLink:
        "https://us04web.zoom.us/j/5839697402?pwd=T01CeDdOMGZHZVplOGdzK2ZieGpZdz09",
    };
  },

  mutations: {
    getLessons(state, payload) {
      state.lessons = payload.lessons;
    },
    changeState(state, payload) {
      state.state = payload.state;
    },
    addOfferedLesson(state, { ids }) {
      state.offeredLessons.push(ids);
    },
    deleteOfferedLesson(state, { lessonId, offerLogId }) {
      if (!lessonId && !offerLogId) return;
      state.offeredLessons = state.offeredLessons.filter(
        (lesson) =>
          (!lessonId || lesson.lessonId != lessonId) &&
          (!offerLogId || lesson.offerLogId != offerLogId)
      );
    },
  },

  actions: {
    async getLessons(context) {
      context.commit("changeState", { state: "listening" });
      loop(context);
    },
    async sendOffer(context, { lesson }) {
      const res = await sendOffer(context, { logId: lesson.logId });
      if (res.statusText === "OK") {
        addOfferedLesson();
        return res.data.logId;
      }

      function addOfferedLesson() {
        context.commit("addOfferedLesson", {
          ids: {
            lessonLogId: lesson.logId,
            lessonId: lesson.lessonId,
            offerLogId: res.data.logId,
          },
        });
      }
    },
    async cancelOffer(context, { offerLogId }) {
      const r = await cancelOffer(context, { offerLogId });
      r ? context.commit("deleteOfferedLesson", { offerLogId }) : null;
    },
  },
};

async function loop(context) {
  switch (context.state.state) {
    case "listening":
      await getLessons(context);
      await listenForAccepted(context);
      break;
    case "idle":
    default:
      return;
  }
  await new Promise((r) => setTimeout(r, 1000));
  loop(context);
}

async function getLessons(context) {
  return await apiRequest({
    method: "get",
    urlEnd: "/lessons/open/" + context.state.userUUID,
  })
    .then((r) => (r === undefined ? [] : r))
    .then((r) => r.data.lessons.map((lesson) => normalize(lesson)))
    .then((lessons) => context.commit("getLessons", { lessons }));
  function normalize(lesson) {
    lesson.details = JSON.parse(lesson.details.replace("/", ""));
    return lesson;
  }
}

async function sendOffer({ state }, { logId }) {
  return await apiRequest({
    method: "post",
    urlEnd: "/lessons/logs/" + logId + "/offer/" + state.userUUID,
  });
}

async function listenForAccepted(context) {
  const logArr = await getLogArr(context);
  const acceptedLog = getAcceptedLog(logArr);
  if (acceptedLog?.statusText === "OK" && context.state.state === "listening") {
    context.commit("changeState", { state: "accepted" });
    const acceptedLogId = getAcceptedLogId(acceptedLog);
    cancelOtherLessons(context, { lessonId: acceptedLog.data.lessonId });
    const initRes = await initConference(context, { acceptedLogId });
    tryOpenConference(context, { initRes });
  }
  async function getLogArr(context) {
    return await axios
      .all(context.state.offeredLessons.map((ids) => request(context, { ids })))
      .then((r) => r.filter((res) => res != undefined));

    async function request(context, { ids }) {
      return await apiRequest({
        method: "get",
        urlEnd:
          "/lessons/logs/" +
          ids.offerLogId +
          "/accepted/" +
          context.state.userUUID,
      }).then((r) => {
        if (r != undefined) return r;
        context.commit("deleteOfferedLesson", { offerLogId: ids.offerLogId });
      });
    }
  }
  function getAcceptedLog(logArr) {
    return logArr.find((log) =>
      log.data.childLogs.some((childLog) => childLog.type === "ACCEPTED")
    );
  }
  function getAcceptedLogId(acceptedLog) {
    return acceptedLog.data.childLogs.find(
      (childLog) => childLog.type === "ACCEPTED"
    ).id;
  }
  function cancelOtherLessons(context, { lessonId }) {
    context.commit("deleteOfferedLesson", { lessonId });
    context.state.offeredLessons.forEach((lesson) => {
      context.dispatch("cancelOffer", { offerLogId: lesson.offerLogId });
    });
  }
  async function initConference({ state }, { acceptedLogId }) {
    return await apiRequest({
      method: "post",
      urlEnd: "/lessons/logs/" + acceptedLogId + "/init/" + state.userUUID,
      data: {
        zoomLink: state.zoomLink,
      },
    });
  }
  function tryOpenConference(context, { initRes }) {
    if (initRes?.statusText != "OK") return;
    context.commit("changeState", { state: "conference" });
    window.open(context.state.zoomLink, "_self");
  }
}

async function cancelOffer({ state }, { offerLogId }) {
  return await apiRequest({
    method: "post",
    urlEnd: "/lessons/logs/" + offerLogId + "/close/" + state.userUUID,
  });
}

// ---------------------------------

// temporary

// ---------------------------------

function getUUID() {
  return "tutor" + Date.now();
}
