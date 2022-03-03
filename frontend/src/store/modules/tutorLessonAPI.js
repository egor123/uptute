import { apiRequest } from "@/services/api.service.js";

export default {
  namespaced: true,
  state() {
    return {
      state: "idle",
      userUUID: "tutorUuid",
      accountInfo: {
        // firstName: "Johann",
        // lastName: "Herman",
        // languages: ["EN", "EST"],
        // imgUrl:
        //   "https://img.search.brave.com/SaaC3uVXz5n4X-v1xLLQB9t5nB2ty4R6mfO594_23B8/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9jZG4u/ZHJpYmJibGUuY29t/L3VzZXJzLzU1MzQv/c2NyZWVuc2hvdHMv/MTQyMzAxMzMvbWVk/aWEvZTJmODUzZjgy/MzJhY2FkNzhiZjE0/M2MzMmYyZjNhMDQu/anBn",
        // age: 20,
        // moto: "Quam sit aut voluptatem ut modi repellat sit.",
        // about:
        //   "Dolorum sit voluptatem temporibus fugiat est eum. Nam blanditiis cupiditate qui eum maiores. Sed et facere ut ducimus. Odio saepe aspernatur vitae optio rerum nobis. Et aperiam tempore enim corrupti consectetur sequi est.",
        // rating: 3.4,
        // pph: 67.90069,
        // hours: 856.3476,
        // subjects: ["MATH", "ESL"],
        // audience: {
        //   from: 3,
        //   to: 10,
        // },
        // comments: 10,
        // zoomLink: "http://zoom.com",
      },
      lessons: [],
      offeredLessons: [],
    };
  },

  mutations: {
    getLessons(state, payload) {
      state.lessons = payload.lessons;
    },
    saveOfferedLessonIds(state, { offeredLessonId }) {
      state.offeredLessons.push(offeredLessonId);
    },
    changeState(state, payload) {
      state.state = payload.state;
    },
  },

  actions: {
    async getLessons(context) {
      context.commit("changeState", { state: "listening" });
      loop(context);
    },
    async sendOffer(context, { lessonId }) {
      const bool = await sendOffer(context, { lessonId }).then((r) => r.data);
      if (bool) {
        context.commit("saveOfferedLessonIds", { lessonId });
        return lessonId;
      }
    },
    async cancelOffer() {
      const bool = await cancelOffer(context, { lessonId }).then((r) => r.data);
      console.log(bool);
    },
  },
};

async function loop(context) {
  switch (context.state.state) {
    case "listening":
      context.commit("getLessons", { lessons: await fetchLessons() });
      // deleteHistory(context);
      break;
    case "idle":
    default:
      return;
  }
  await new Promise((r) => setTimeout(r, 5000));
  loop(context);
}

async function fetchLessons() {
  return await apiRequest({
    method: "get",
    urlEnd: "/lessons/open",
  })
    .then((r) => r.data.lessons)
    .then((lessons) => lessons.map((lesson) => normalize(lesson)));

  function normalize(lesson) {
    lesson.details = JSON.parse(lesson.details.replace("/", ""));
    return lesson;
  }
}

async function sendOffer({ state }, { lessonId }) {
  return await apiRequest({
    method: "post",
    urlEnd: "/lessons/" + lessonId + "/offer/" + state.userUUID,
  });
  // .then((r) => r?.data)
}

async function cancelOffer({ state }, lessonId) {
  return await apiRequest({
    method: "post",
    urlEnd: "/lessons/" + lessonId + "/offer/" + state.userUUID,
  });
}

// ------------------------------------------

// ------------------------------------------

// Assisting functions

// ------------------------------------------

// ------------------------------------------

// async function addTutorToServer(context) {
//   const resp = await axios({
//     method: "post",
//     url: context.state.root + "/b",
//     data: context.state.accountInfo,
//     headers: {
//       "X-Master-Key":
//         "$2b$10$3LvCwlFUlVltdOK3N8XBauySGWc2yE/RSXS/EZqdX.bAkdIIqib2G",
//       "Content-Type": "application/json",
//       "X-Collection-Id": "621c751e25fb1b26b18a28cc",
//     },
//   });
//   return resp;
// }

// function deleteHistory(context) {
//   context.state.lessons.forEach((obj) =>
//     deleteLessons(context, { lessonId: obj.metadata.id })
//   );
//   async function deleteLessons(context, { lessonId }) {
//     console.log("DELETING");
//     const method = "delete",
//       urlEnd = context.state.root + "/b/" + lessonId;
//     const resp = await apiRequest({ method, urlEnd });
//     console.log(resp);
//     return resp;
//   }
// }
