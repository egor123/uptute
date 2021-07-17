const mobileInput = {
  install(Vue) {
    Vue.prototype.$mb = new Vue();
    Vue.prototype.$mb.addSwipeListener = (callback, el = document) => {
      const pos = { x: null, y: null };
      const move = { x: 0, y: 0 };
      const touchstart = (e) => {
        pos.x = e.touches[0].clientX;
        pos.y = e.touches[0].clientX;
        move.x = 0;
        move.y = 0;
        callback(move, "start");
      };
      const touchmove = (e) => {
        move.x = pos.x - e.touches[0].clientX;
        move.y = pos.y - e.touches[0].clientY;
        callback(move, "move");
      };
      const touchend = () => {
        callback(move, "end");
      };
      el.addEventListener("touchstart", touchstart);
      el.addEventListener("touchmove", touchmove);
      el.addEventListener("touchend", touchend);
      el.addEventListener(
        "removeSwipeListener",
        (e) => {
          if (callback != e.detail) return;
          el.removeEventListener("touchstart", touchstart);
          el.removeEventListener("touchmove", touchmove);
          el.removeEventListener("touchend", touchend);
        },
        { once: true }
      );
    };
    Vue.prototype.$mb.removeSwipeListener = (callback, el = document) => {
      el.dispatchEvent(
        new CustomEvent("removeSwipeListener", { detail: callback })
      );
    };
    Vue.prototype.$mb.isMobileInput = () => {
      return window.matchMedia("(pointer: coarse)").matches;
    };
  },
};
export default mobileInput;
