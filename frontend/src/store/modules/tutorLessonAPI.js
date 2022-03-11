import { apiRequest } from "@/services/api.service.js";
import router from "@/router";
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
    getVm(state, { vm }) {
      state.vm = vm;
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
    async getLessons(context, { vm }) {
      context.commit("changeState", { state: "listening" });
      context.commit("getVm", { vm });
      loop(context);
    },
    async sendOffer(context, { lesson }) {
      const res = await sendOffer(context, { logId: lesson.logId });
      if (!exitIfUndefined(context, res)) return null;
      addOfferedLesson();
      return res.data.logId;

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
      if (r) context.commit("deleteOfferedLesson", { offerLogId });
      else alert(context.state.vm.$l("choose_a.student.cancel_fail"));
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
    .then((r) => (!exitIfUndefined(context, r) ? null : r))
    .then((r) => r.data.lessons.map((lesson) => normalize(lesson)))
    .then((lessons) => context.commit("getLessons", { lessons }));
  function normalize(lesson) {
    lesson.details = JSON.parse(lesson.details.replace("/", ""));
    return lesson;
  }
}

async function sendOffer(context, { logId }) {
  return await apiRequest({
    method: "post",
    urlEnd: "/lessons/logs/" + logId + "/offer/" + context.state.userUUID,
  });
}

async function listenForAccepted(context) {
  const logArr = await getLogArr(context);
  if (!exitIfUndefined(context, logArr)) return;
  logArr.forEach((log) => deleteIfUndefined(context, { log }));
  const acceptedLog = getAcceptedLog(logArr);
  if (!acceptedLog) return;
  context.commit("changeState", { state: "accepted" });
  const acceptedLogId = getAcceptedLogId(acceptedLog);
  cancelOtherLessons(context, { lessonId: acceptedLog.data.lessonId });
  const initRes = await initConference(context, { acceptedLogId });
  if (!backToListeningIfUndefined(context, { initRes })) return;
  openConference(context);

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
  function deleteIfUndefined({ state }, { log }) {
    if (log || log?.statusText != "OK")
      cancelOffer({ state }, { offerLogId: log.data.logId });
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
  async function initConference({ state }, { acceptedLogId }) {
    return await apiRequest({
      method: "post",
      urlEnd: "/lessons/logs/" + acceptedLogId + "/init/" + state.userUUID,
      data: {
        zoomLink: state.zoomLink,
      },
    });
  }
  function backToListeningIfUndefined(context, { initRes }) {
    if (!initRes) {
      alert(context.state.vm.$l("global.wrong"));
      context.commit("changeState", { state: "listening" });
    }
    return initRes;
  }
  function cancelOtherLessons(context, { lessonId }) {
    context.commit("deleteOfferedLesson", { lessonId });
    context.state.offeredLessons.forEach((lesson) => {
      context.dispatch("cancelOffer", { offerLogId: lesson.offerLogId });
    });
  }
  function openConference(context) {
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

function exitIfUndefined(context, payload) {
  if (!payload) {
    alert(context.state.vm.$l("global.wrong"));
    context.commit("changeState", { state: "idle" });
    deleteAllOffers(context);

    router.go(-1);
  }
  return payload;
  async function deleteAllOffers({ state }) {
    axios.all(
      state.offeredLessons.map((offer) =>
        cancelOffer({ state }, { offerLogId: offer.offerLogId })
      )
    );
  }
}
