import axios from "axios";
import { apiRequest } from "@/services/api.service.js";

export default {
  state() {
    return {
      state: "idle",
      info: {
        metadata: {},
        record: { tutors: [] },
      },
      root: "https://api.jsonbin.io/v3",
    };
  },
  mutations: {
    changeInfo(state, { info }) {
      console.log(info);
      console.log("--------------------------");
      state.info = info;
    },
  },
  actions: {
    async request(context, payload) {
      context.state.state = "initialization";
      payload.tutors = [];
      context.state.info = payload;

      loop(context);

      await new Promise((r) => setTimeout(r, 60000)); // to delete !!!!
      context.state.state = "idle"; // to delete !!!!
    },
    async deleteLesson(context) {
      context.state.state = "idle";
      const resp = await deleteLesson(context);
      context.commit("changeInfo", {});
      return resp;
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
  let info = await apiRequest({ method, urlEnd, data });
  info = info.data;
  context.commit("changeInfo", { info });

  context.state.state = "listening";
}

async function listenForChanges(context) {
  const method = "get";
  const urlEnd =
    context.state.root + "/b/" + context.state.info.metadata.id + "/latest";
  let info = await apiRequest({ method, urlEnd });
  info = info.data;

  const tutors = await fetchTutorObjects(info);
  info.record.tutors = tutors;

  context.commit("changeInfo", { info });

  console.log("New Change");
  async function fetchTutorObjects(info) {
    let tutorArr = info.record.tutors;
    // let tutorArr = ["621de98206182767436a4b87"];
    let newTutorsArr = await axios.all(tutorArr.map((tutor) => request(tutor)));

    newTutorsArr = newTutorsArr.map((tutor) => {
      const uuid = tutor.data.metadata.id;
      tutor = tutor.data.record;
      tutor.uuid = uuid;
      return tutor;
    });
    return newTutorsArr;

    function request(id) {
      const method = "get";
      const urlEnd = context.state.root + "/b/" + id + "/latest";
      const resp = apiRequest({ method, urlEnd });
      return resp;
    }
  }
}

async function deleteLesson({ state }) {
  const method = "delete",
    urlEnd = state.root + "/b/" + state.info.metadata.id;
  const resp = await apiRequest({ method, urlEnd });
  console.log("DELETED");
  console.log(resp);
  console.log("-----------------");

  return resp;
}
