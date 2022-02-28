import { apiRequest } from "@/services/api.service.js";

export default {
  state() {
    return {
      root: "https://api.jsonbin.io/v3",
      collectionId: "621c751dc4790b34062524db",
      students: [
        {
          name: "NoName",
          date: { weekday: "mon", day: 31, month: "apr", year: 2023 },
          time: {
            start: "16.00",
            end: "17.30",
          },
          grade: 11,
          subject: "Maths",
          topic: {
            title: "Logarithms",
            text: "Woud like to revise the basics before the test.",
          },
        },
      ],
    };
  },
  mutations: {
    getStudents(state, payload) {
      // console.log(payload);
      payload;
    },
  },
  actions: {
    async getStudents(context) {
      const method = "get";
      const urlEnd =
        context.state.root + "/c/" + context.state.collectionId + "/bins";
      const students = await apiRequest({ method, urlEnd });
      context.commit("getStudents", students);
    },
  },
  namespaced: true,
};
