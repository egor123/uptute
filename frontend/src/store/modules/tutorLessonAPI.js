import { apiRequest } from "@/services/api.service.js";
import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {
      state: "idle",
      uuid: "621de98206182767436a4b87", // is pulled from JSONBIN.io
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
      root: "https://api.jsonbin.io/v3",
      collectionId: "621c751dc4790b34062524db",
      lessons: [],
      offeredLesson: {},
    };
  },

  mutations: {
    getLessons(state, payload) {
      state.lessons = payload.lessons;
    },
    saveOfferedLessonData(state, { offeredLesson }) {
      state.offeredLesson = offeredLesson;
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
    async sendOffer(context, { lesson }) {
      const offeredLesson = await addSelfToLesson(context, { lesson });
      context.commit("saveOfferedLessonData", { offeredLesson });
    },
  },
};

async function loop(context) {
  switch (context.state.state) {
    case "listening":
      context.commit("getLessons", { lessons: await fetchLessons(context) });
      // deleteHistory(context);
      break;
    case "idle":
    default:
      return;
  }
  await new Promise((r) => setTimeout(r, 5000));
  loop(context);
}

async function fetchLessons(context) {
  return await axios.all(
    (await getIds(context))
      .slice(0, 5) // Working on max 5 a time
      .map((id) => getLessoninfo(context, { lessonId: id }))
  );

  async function getIds(context) {
    return await apiRequest({
      method: "get",
      urlEnd: context.state.root + "/c/" + context.state.collectionId + "/bins",
    }).then((r) => r.data.map((el) => el.record));
  }
  async function getLessoninfo(context, { lessonId }) {
    return await apiRequest({
      method: "get",
      urlEnd: context.state.root + "/b/" + lessonId + "/latest",
    }).then((r) => r?.data);
  }
}

async function addSelfToLesson(context, { lesson }) {
  lesson.record.tutors.push(context.state.uuid);

  return await apiRequest({
    method: "put",
    urlEnd: context.state.root + "/b/" + lesson.metadata.id,
    data: lesson.record,
  }).then((r) => r?.data);
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
