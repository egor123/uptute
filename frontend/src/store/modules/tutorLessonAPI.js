import { apiRequest } from "@/services/api.service.js";
import axios from "axios";

export default {
  state() {
    return {
      userName: "Hardcoded Tutor",
      root: "https://api.jsonbin.io/v3",
      collectionId: "621c751dc4790b34062524db",
      lessons: [
        // {
        //   record: {
        //     name: "NoName",
        //     // date: { weekday: "mon", day: 31, month: "apr", year: 2023 },
        //     // time: {
        //     //   start: "16.00",
        //     //   end: "17.30",
        //     // },
        //     grade: 11,
        //     subject: "Maths",
        //     topic: {
        //       title: "Logarithms",
        //       text: "Woud like to revise the basics before the test.",
        //     },
        //   },
        // },
      ],
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
  },
  actions: {
    async getLessons(context) {
      const lessonIdArr = await getIds(context);

      const lessons = await axios.all(
        lessonIdArr
          .slice(0, 5) // WTF ?!?!?! Working on max 5 a time
          .map((id) => getLessoninfo(context, { lessonId: id }))
      );

      context.commit("getLessons", { lessons });
      // deleteHistory(context);
    },
    async sendOffer(context, { lesson }) {
      const offeredLesson = await addSelfToLesson(context, { lesson });
      context.commit("saveOfferedLessonData", { offeredLesson });
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

async function addSelfToLesson(context, { lesson }) {
  lesson.record.tutors.push(context.state.userName);

  const method = "put",
    urlEnd = context.state.root + "/b/" + lesson.metadata.id,
    data = lesson.record;
  const resp = await apiRequest({ method, urlEnd, data });
  return resp.data;
}

// function deleteHistory(context) {
//   // Works with an error
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
