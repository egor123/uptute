import { apiRequest } from "@/services/api.service.js";

export default {
  state() {
    return {
      state: "idle",
      info: {},
      userUUID: "testuser123",
      lessonId: "",
      logId: "",
      tutors: [],
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
    getAcceptedLogId(state, { acceptedLogId }) {
      state.acceptedLogId = acceptedLogId;
    },
  },
  actions: {
    async request(context, { info }) {
      context.commit("changeState", { state: "initializing" });
      info.tutors = [];
      context.state.info = info;

      loop(context);
    },
    async rejectOffer(context, { offerLogId }) {
      return await rejectOffer(context, { offerLogId }).then(
        (r) => r.statusText === "OK"
      );
    },
    async accept(context, { offerLogId }) {
      const res = await accept(context, { offerLogId });
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
    }).then((r) => r.data);
  }
}

async function getOffers(context) {
  const offerLogIds = await getOfferLogIds(context);
  const tutors = await getTutorsDetails({ offerLogIds });
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
  const getInitRes = await getRequest(context);
  const initLog = getInitLog(getInitRes);
  if (initLog) {
    window.open(getZoomLink(initLog), "_blank");
    context.commit("changeState", { state: "conference" });
  }
  return;

  async function getRequest({ state }) {
    return await apiRequest({
      method: "get",
      urlEnd:
        "/lessons/logs/" + state.acceptedLogId + "/init/" + state.userUUID,
    });
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
