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
    Vue.prototype.$mb.addSwipedListener = (callback, el = document) => {
      const delay = 200;
      const minMagnitude = 100;
      const swipe = (e) => {
        const pos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        const move = { x: 0, y: 0 };
        const touchmove = (e) => {
          move.x = pos.x - e.touches[0].clientX;
          move.y = pos.y - e.touches[0].clientY;
        }
        new Promise((res) => {
          el.addEventListener('touchmove', touchmove);
          el.addEventListener('touchend', () => res(move), { once: true });
          setTimeout(() => res({ x: 0, y: 0 }), delay);
        }).then((data) => {
          el.removeEventListener('touchmove', touchmove);
          if (Math.sqrt(data.x * data.x + data.y * data.y) < minMagnitude) return callback(null);
          if (Math.abs(data.x) > Math.abs(data.y)) callback(data.x > 0 ? "right" : "left");
          else callback(data.y > 0 ? "up" : "down");
        })
      };
      el.addEventListener("touchstart", swipe);
      el.addEventListener(
        "removeSwipedListener",
        (e) => {
          if (callback === e.detail) el.removeEventListener("touchstart", swipe);
        },
        { once: true }
      );
    }
    Vue.prototype.$mb.removeSwipeListener = (callback, el = document) => {
      el.dispatchEvent(
        new CustomEvent("removeSwipeListener", { detail: callback })
      );
    };
    Vue.prototype.$mb.removeSwipedListener = (callback, el = document) => {
      el.dispatchEvent(
        new CustomEvent("removeSwipedListener", { detail: callback })
      );
    };
    Vue.prototype.$mb.isMobileInput = () => {
      return window.matchMedia("(pointer: coarse)").matches;
    };
  },
};
export default mobileInput;
