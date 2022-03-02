import axios from "axios";
import { apiRequest } from "@/services/api.service.js";

export default {
  state() {
    return {
      state: "idle",
      info: {},
      root: "https://api.jsonbin.io/v3",
    };
  },
  mutations: {
    changeInfo(state, { info }) {
      state.info = info;
    },
    changeState(state, payload) {
      state.state = payload.state;
    },
  },
  actions: {
    async request(context, { info }) {
      context.commit("changeState", { state: "initializing" });
      info.tutors = [];
      context.state.info = info;

      loop(context);
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
      await listenForChanges(context);
      break;
    case "idle":
    default:
      return;
  }
  await new Promise((r) => setTimeout(r, 5000));
  loop(context);
}

async function initialize(context) {
  let info = await apiRequest({
    method: "post",
    urlEnd: context.state.root + "/b",
    data: context.state.info,
  }).then((info) => info.data);

  context.commit("changeInfo", { info });
  context.commit("changeState", { state: "listening" });
}

async function listenForChanges(context) {
  let info = await getInfo(context, { id: context.state.info.metadata.id });
  info.record.tutors = await axios.all(
    info.record.tutors.map((id) => getInfo(context, { id }))
  );
  context.commit("changeInfo", { info });

  async function getInfo({ state }, { id }) {
    return await apiRequest({
      method: "get",
      urlEnd: state.root + "/b/" + id + "/latest",
    }).then((info) => info?.data);
  }
}

async function deleteLesson({ state }) {
  return await apiRequest({
    method: "delete",
    urlEnd: state.root + "/b/" + state.info.metadata.id,
  });
}
