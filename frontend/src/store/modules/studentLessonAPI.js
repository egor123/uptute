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
    changeInfo(state, payload) {
      state.info = payload.data;
    },
  },
  actions: {
    async request(context, payload) {
      context.state.state = "initialization";
      context.state.info = payload;

      loop(context);

      await new Promise((r) => setTimeout(r, 10000)); // to delete !!!!
      context.state.state = "idle"; // to delete !!!!
    },
  },
  namespaced: true,
};

async function loop(context) {
  switch (context.state.state) {
    case "initialization":
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
  const method = "post";
  const urlEnd = context.state.root + "/b";
  const data = context.state.info;
  const info = await apiRequest({ method, urlEnd, data });
  context.commit("changeInfo", info);

  context.state.state = "listening";
}

async function listenForChanges(context) {
  const method = "get";
  const urlEnd =
    context.state.root + "/b/" + context.state.info.metadata.id + "/latest";
  const info = await apiRequest({ method, urlEnd });
  context.commit("changeInfo", info);

  console.log("New Change");
}
