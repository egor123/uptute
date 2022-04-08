import { apiRequest } from "@/services/api.service.js";
import router from "@/router";

export default {
  namespaced: true,
  state() {
    return {
      state: "idle",
      info: {},
      userUUID: localStorage.getItem("uuid"),
      lessonId: "",
      logId: "",
      tutors: [],
      vm: null,
    };
  },
  mutations: {
    mutate(state, { name, val }) {
      state[name] = val;
    },
  },
  actions: {
    async request(context, { info, vm }) {
      context.commit("mutate", { name: "state", val: "initializing" });
      context.commit("mutate", { name: "vm", val: vm });
      info.tutors = [];
      context.commit("mutate", { name: "info", val: info });

      loop(context);
    },
    async rejectOffer(context, { offerLogId }) {
      const res = await rejectOffer(context, { offerLogId });
      const bool = res && res.statusText === "OK";
      if (!bool) alert(context.state.vm.$l("choose_a.tutor.fail.reject"));
      return bool;
    },
    async accept(context, { offerLogId }) {
      const res = await accept(context, { offerLogId });
      if (!res) {
        alert(context.state.vm.$l("choose_a.tutor.fail.accept"));
        return;
      }
      context.commit("mutate", { name: "acceptedLogId", val: res.data.logId });
      context.commit("mutate", { name: "state", val: "accepted" });
    },
    async deleteLesson(context) {
      context.commit("mutate", { name: "state", val: "idle" });
      return await deleteLesson(context);
    },
  },
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
  if (!exitIfUndefined(context, { data, alertName: "init" })) return;

  context.commit("mutate", { name: "lessonId", val: data.lessonId });
  context.commit("mutate", { name: "logId", val: data.logId });
  context.commit("mutate", { name: "state", val: "listening" });

  async function postData({ state }) {
    return await apiRequest({
      method: "post",
      urlEnd: "/lessons/create",
      data: {
        subject: state.info.subject,
        details: "Test details",
      },
    }).then((r) => r?.data);
  }
}

async function getOffers(context) {
  const offerLogIds = await getOfferLogIds(context);
  if (!exitIfUndefined(context, { data: offerLogIds, alertName: "offers" }))
    return;
  const tutors = await getTutorsDetails({ offerLogIds });
  // handle undefined values of tutor
  context.commit("mutate", { name: "tutors", val: tutors });

  async function getOfferLogIds({ state }) {
    return await apiRequest({
      method: "get",
      urlEnd: "/lessons/logs/" + state.logId + "/offer",
    }).then((r) => r.data.childLogs.map((obj) => obj.id));
  }
  async function getTutorsDetails({ offerLogIds }) {
    return offerLogIds.map((offerLogId) => {
      return { details: {}, offerLogId };
    });
    // here should be axios.all request for tutor info
  }
}
async function rejectOffer(context, { offerLogId }) {
  return await apiRequest({
    method: "post",
    urlEnd: "/lessons/logs/" + offerLogId + "/close",
  });
}

async function deleteLesson({ state }) {
  console.log("delete");
  console.log(state.logId);
  return await apiRequest({
    method: "post",
    urlEnd: "/lessons/logs/" + state.logId + "/close",
  });
}

async function accept(context, { offerLogId }) {
  return await apiRequest({
    method: "post",
    urlEnd: "/lessons/logs/" + offerLogId + "/accept",
  });
}

async function listenForInit(context) {
  const getInitRes = await getRequest(context);
  if (!stopIfUndefined({ data: getInitRes })) return;
  const initLog = getInitLog(getInitRes);
  if (initLog) {
    context.commit("mutate", { name: "state", val: "conference" });
    window.open(getZoomLink(initLog), "_self");
  }
  return;

  async function getRequest({ state }) {
    return await apiRequest({
      method: "get",
      urlEnd: "/lessons/logs/" + state.acceptedLogId + "/init",
    });
  }
  function stopIfUndefined({ data }) {
    if (!data) {
      alert(context.state.vm.$l("choose_a.tutor.fail.conference"));
      context.commit("mutate", { name: "state", val: "listening" });
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

function exitIfUndefined(context, { data, alertName }) {
  if (!data) {
    alert(context.state.vm.$l(`choose_a.tutor.fail.${alertName}`));
    context.dispatch("deleteLesson");
    router.go(-1);
  }
  return data;
}
