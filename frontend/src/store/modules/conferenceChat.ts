import { dataChannelOptions as options } from "@/constants/peer-connection.js";

export default {
  namespaced: true,
  state: {
    dc: null,
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
      ctx.state.dc.onerror = (error) => {
        console.error("Data Channel Error:", error);
      };

      ctx.state.dc.onopen = (e) => {
        console.log("Data channel opened", e);
      };

      ctx.state.dc.onmessage = (event) => {
        console.log("Got Data Channel Message:", event.data);
      };

      ctx.state.dc.onclose = () => {
        console.log("The Data Channel is Closed");
      };
    },
    sendMessage({ state }, { msg }) {
      console.log("Sending:", msg);
      state.dc.send(msg);
    },
  },
  mutations: {
    mutate(state, { name, val }) {
      state[name] = val;
    },
  },
};
