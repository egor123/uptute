import { dataChannelOptions as options } from "@/constants/peer-connection.js";

export default {
  namespaced: true,
  state: {
    dc: null,
    messages: [],
  },
  actions: {
    createDataChannel(ctx, { peerConnection }) {
      const dc = peerConnection.createDataChannel("chat", options);
      ctx.commit("mutate", { name: "dc", val: dc });
      ctx.dispatch("setListeners");

      console.log("Created a data channel:", dc);
    },
    pullDataChannel(ctx, { dc }) {
      ctx.commit("mutate", { name: "dc", val: dc });
      ctx.dispatch("setListeners");

      console.log("Pulled a data channel:", dc);
    },
    setListeners(ctx) {
      const dc = ctx.state.dc;

      dc.onmessage = (e) => ctx.dispatch("onMessage", { e });

      dc.onerror = (error) => console.error("Data Channel Error:", error);
      dc.onopen = (e) => console.log("Data channel opened", e);
      dc.onclose = () => console.log("The Data Channel is Closed");
    },
    sendMessage(ctx, { text }) {
      console.log("Sending:", text);

      ctx.state.dc.send(text);

      ctx.dispatch("saveMessage", { text, isSelf: true });

      // const msg = {
      //   text,
      //   time: new Date().valueOf(),
      //   isSelf: false,
      // };

      // commit("addMessage", { msg });
    },
    onMessage(ctx, { e }) {
      console.log("Got Data Channel Message:", e.data);

      ctx.dispatch("saveMessage", { text: e.data, isSelf: false });

      // const msg = {
      //   text: e.data,
      //   time: new Date().valueOf(),
      //   isSelf: false,
      // };

      // commit("addMessage", { msg });
    },
    saveMessage({ commit }, { text, isSelf }) {
      const msg = {
        text,
        time: new Date().valueOf(),
        isSelf,
      };

      commit("addMessage", { msg });
    },
  },
  mutations: {
    mutate(state, { name, val }) {
      state[name] = val;
    },
    addMessage(state, { msg }) {
      state.messages.push(msg);
    },
  },
};
