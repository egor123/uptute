import { apiRequest } from "@/services/api.service.js";

export default {
  state() {
    return {
      state: "idle",
      info: {},
      userUUID: "testuser123",
      lessonId: "",
    };
  },
  mutations: {
    changeInfo(state, { info }) {
      state.info = info;
    },
    changeState(state, payload) {
      state.state = payload.state;
    },
    setLessonId(state, { lessonId }) {
      state.lessonId = lessonId;
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
      await getOffers(context);
      break;
    case "idle":
    default:
      return;
  }
  await new Promise((r) => setTimeout(r, 5000));
  loop(context);
}

async function initialize(context) {
  let lessonId = await apiRequest({
    method: "post",
    urlEnd: "/lessons/init/" + context.state.userUUID,
    data: {
      subject: context.state.info.subject,
      details: "Test details",
    },
  }).then((r) => r.data.lessonId);

  context.commit("setLessonId", { lessonId });
  context.commit("changeState", { state: "listening" });
}

async function getOffers(context) {
  const tutorIds = await apiRequest({
    method: "get",
    urlEnd: "/lessons/" + context.state.lessonId + "/offers",
  }).then((r) => r.data.tutors);
  tutorIds;

  // console.log(tutorIds);

  // let info = await getInfo(context, { id: context.state.info.metadata.id });
  // info.record.tutors = await axios.all(
  //   info.record.tutors.map((id) => getInfo(context, { id }))
  // );
  // context.commit("changeInfo", { info });

  // async function getInfo({ state }, { id }) {
  //   return await apiRequest({
  //     method: "get",
  //     urlEnd: state.root + "/b/" + id + "/latest",
  //   }).then((info) => info?.data);
  // }
}

async function deleteLesson({ state }) {
  return await apiRequest({
    method: "delete",
    urlEnd: "/lessons/" + state.lessonId + "/" + state.userUUID,
  });
}
