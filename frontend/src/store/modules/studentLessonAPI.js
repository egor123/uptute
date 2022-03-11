import { apiRequest } from "@/services/api.service.js";
import router from "@/router";

export default {
  state() {
    return {
      state: "idle",
      info: {},
      userUUID: "testuser123",
      lessonId: "",
      logId: "",
      tutors: [],
      vm: null,
    };
  },
  mutations: {
    changeInfo(state, { info }) {
      state.info = info;
    },
    changeState(state, payload) {
      state.state = payload.state;
    },
    getLessonId(state, { lessonId }) {
      state.lessonId = lessonId;
    },
    getLogId(state, { logId }) {
      state.logId = logId;
    },
    getTutors(state, { tutors }) {
      state.tutors = tutors;
    },
    getVm(state, { vm }) {
      state.vm = vm;
    },
    getAcceptedLogId(state, { acceptedLogId }) {
      state.acceptedLogId = acceptedLogId;
    },
  },
  actions: {
    async request(context, { info, vm }) {
      context.commit("changeState", { state: "initializing" });
      context.commit("getVm", { vm });
      info.tutors = [];
      context.state.info = info;

      loop(context);
    },
    async rejectOffer(context, { offerLogId }) {
      const res = await rejectOffer(context, { offerLogId });
      const bool = res && res.statusText === "OK";
      if (!bool) alert(context.state.vm.$l("choose_a.tutor.reject_fail"));
      return bool;
    },
    async accept(context, { offerLogId }) {
      const res = await accept(context, { offerLogId });
      if (!res) {
        alert(context.state.vm.$l("choose_a.tutor.accept_fail"));
        return;
      }
      context.commit("getAcceptedLogId", { acceptedLogId: res.data.logId });
      context.commit("changeState", { state: "accepted" });
    },
    async deleteLesson(context) {
      context.commit("changeState", { state: "idle" });
      return await deleteLesson(context).then(context.commit("changeInfo", {}));
    },
  },
  namespaced: true,
};

async function loop(context) {
  switch (context.state.state) {
    case "initializing":
      await initialize(context);
      break;
    case "listening":
      await getOffers(context);
      break;
    case "accepted":
      await listenForInit(context);
      break;
    case "idle":
    default:
      return;
  }
  await new Promise((r) => setTimeout(r, 1000));
  loop(context);
}

async function initialize(context) {
  let data = await postData(context);
  if (!exitIfUndefined(context, data)) return;

  context.commit("getLessonId", { lessonId: data.lessonId });
  context.commit("getLogId", { logId: data.logId });
  context.commit("changeState", { state: "listening" });

  async function postData({ state }) {
    return await apiRequest({
      method: "post",
      urlEnd: "/lessons/create/" + state.userUUID,
      data: {
        subject: state.info.subject,
        details: "Test details",
      },
    }).then((r) => r?.data);
  }
}

async function getOffers(context) {
  const offerLogIds = await getOfferLogIds(context);
  if (!exitIfUndefined(context, offerLogIds)) return;
  const tutors = await getTutorsDetails({ offerLogIds });
  // handle undefined values of tutor
  context.commit("getTutors", { tutors });

  async function getOfferLogIds({ state }) {
    return await apiRequest({
      method: "get",
      urlEnd: "/lessons/logs/" + state.logId + "/offer/" + state.userUUID,
    }).then((r) => r.data.childLogs.map((obj) => obj.id));
  }
  async function getTutorsDetails({ offerLogIds }) {
    return offerLogIds.map((offerLogId) => {
      return { details: {}, offerLogId };
    });
    // here should be axios.all request for tutor info
  }
}

async function rejectOffer({ state }, { offerLogId }) {
  return await apiRequest({
    method: "post",
    urlEnd: "/lessons/logs/" + offerLogId + "/close/" + state.userUUID,
  });
}

async function deleteLesson({ state }) {
  return await apiRequest({
    method: "post",
    urlEnd: "/lessons/logs/" + state.logId + "/close/" + state.userUUID,
  });
}

async function accept({ state }, { offerLogId }) {
  return await apiRequest({
    method: "post",
    urlEnd: "/lessons/logs/" + offerLogId + "/accept/" + state.userUUID,
  });
}

async function listenForInit(context) {
  const getInitRes = await getRequest(context).then();
  if (!stopIfUndefined({ data: getInitRes })) return;
  const initLog = getInitLog(getInitRes);
  if (initLog) {
    context.commit("changeState", { state: "conference" });
    window.open(getZoomLink(initLog), "_self");
  }
  return;

  async function getRequest({ state }) {
    return await apiRequest({
      method: "get",
      urlEnd:
        "/lessons/logs/" + state.acceptedLogId + "/init/" + state.userUUID,
    });
  }
  function stopIfUndefined({ data }) {
    if (!data) {
      alert(context.state.vm.$l("choose_a.student.init_fail"));
      context.commit("changeState", { state: "listening" });
    }
    return data;
  }
  function getInitLog(getInitRes) {
    return getInitRes.data.childLogs.find(
      (childLog) => childLog.type === "INIT"
    );
  }
  function getZoomLink(initLog) {
    return normalizeLink(initLog.details).zoomLink;
    function normalizeLink(info) {
      return JSON.parse(info.replace("\\", ""));
    }
  }
}

function exitIfUndefined(context, payload) {
  if (!payload) {
    alert(context.state.vm.$l("global.wrong"));
    context.dispatch("deleteLesson");
    router.go(-1);
  }
  return payload;
}
