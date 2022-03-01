import { apiRequest } from "@/services/api.service.js";
import axios from "axios";

export default {
  state() {
    return {
      state: "idle",
      uuid: "621de98206182767436a4b87", // is pulled from JSONBIN.io
      accountInfo: {
        firstName: "Johann",
        lastName: "Herman",
        languages: ["EN", "EST"],
        imgUrl:
          "https://img.search.brave.com/SaaC3uVXz5n4X-v1xLLQB9t5nB2ty4R6mfO594_23B8/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9jZG4u/ZHJpYmJibGUuY29t/L3VzZXJzLzU1MzQv/c2NyZWVuc2hvdHMv/MTQyMzAxMzMvbWVk/aWEvZTJmODUzZjgy/MzJhY2FkNzhiZjE0/M2MzMmYyZjNhMDQu/anBn",
        age: 20,
        moto: "Quam sit aut voluptatem ut modi repellat sit.",
        about:
          "Dolorum sit voluptatem temporibus fugiat est eum. Nam blanditiis cupiditate qui eum maiores. Sed et facere ut ducimus. Odio saepe aspernatur vitae optio rerum nobis. Et aperiam tempore enim corrupti consectetur sequi est.",

        rating: 3.4,
        pph: 67.90069,
        hours: 856.3476,
        subjects: ["MATH", "ESL"],
        audience: {
          from: 3,
          to: 10,
        },
        comments: 10,

        zoomLink: "http://zoom.com",
      },
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
    changeState(state, payload) {
      state.state = payload.state;
    },
  },
  actions: {
    async getLessons(context) {
      // addTutorToServer(context);
      context.commit("changeState", { state: "initialization" });
      // loop(context);

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

// function loop(context) {
//   switch (context.state.state) {
//     case "initialization":
//   }
// }

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
  lesson.record.tutors.push(context.state.uuid);

  console.log("-------------");
  console.log(lesson);

  const method = "put",
    urlEnd = context.state.root + "/b/" + lesson.metadata.id,
    data = lesson.record;
  const resp = await apiRequest({ method, urlEnd, data });
  console.log(resp);
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
//   console.log("DELETING");
//   const method = "delete",
//     urlEnd = context.state.root + "/b/" + lessonId;
//   const resp = await apiRequest({ method, urlEnd });
//   console.log(resp);
//   return resp;
// }

// async function addTutorToServer(context) {
//   console.log("RUNNED");
//   const method = "post",
//     url = context.state.root + "/b",
//     data = context.state.accountInfo,
//     headers = {
//       "X-Master-Key":
//         "$2b$10$3LvCwlFUlVltdOK3N8XBauySGWc2yE/RSXS/EZqdX.bAkdIIqib2G",
//       "Content-Type": "application/json",
//       "X-Collection-Id": "621c751e25fb1b26b18a28cc",
//     };
//   // const resp = await apiRequest({ method, urlEnd });
//   const resp = await axios({
//     method,
//     url,
//     data,
//     headers,
//   });

//   console.log("?>?>?>?>?>?>?>?>?>?>");
//   console.log(resp);
//   return resp;
// }
