import { apiRequest } from "@/services/api.service.js";
import axios from "axios";

export default {
  state() {
    return {
      root: "https://api.jsonbin.io/v3",
      collectionId: "621c751dc4790b34062524db",
      lessons: [
        {
          record: {
            name: "NoName",
            // date: { weekday: "mon", day: 31, month: "apr", year: 2023 },
            // time: {
            //   start: "16.00",
            //   end: "17.30",
            // },
            grade: 11,
            subject: "Maths",
            topic: {
              title: "Logarithms",
              text: "Woud like to revise the basics before the test.",
            },
          },
        },
      ],
    };
  },
  mutations: {
    getLessons(state, payload) {
      // console.log(payload);
      state.lessons = payload.lessons;
    },
  },
  actions: {
    async getLessons(context) {
      const lessonIdArr = await getIds(context);

      const lessons = await axios.all(
        lessonIdArr.map((id) => getLessoninfo(context, { lessonId: id }))
      );

      context.commit("getLessons", { lessons });
      // deleteHistory(context);
    },
  },
  namespaced: true,
};

async function getIds(context) {
  const method = "get";
  const urlEnd =
    context.state.root + "/c/" + context.state.collectionId + "/bins";
  const resp = await apiRequest({ method, urlEnd });
  return resp.data.map((el) => el.record);
}

async function getLessoninfo(context, { lessonId }) {
  const method = "get";
  const urlEnd = context.state.root + "/b/" + lessonId + "/latest";
  const resp = await apiRequest({ method, urlEnd });
  // console.log(resp.data);
  return resp.data;
}

// function deleteHistory(context) { // Works with an error
//   console.log(context.state);
//   context.state.lessons.forEach((obj) =>
//     deleteLessons(context, { lessonId: obj.metadata.id })
//   );
// }

// async function deleteLessons(context, { lessonId }) {
//   const method = "delete",
//     urlEnd = context.state.root + "/b/" + lessonId;
//   const resp = await apiRequest({ method, urlEnd });
//   console.log(resp);
//   return resp;
// }
