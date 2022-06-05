export default {
  install(Vue) {
    Vue.prototype.$mb = new Vue();

    const listeners = [
      addSwipeListener,
      removeSwipeListener,

      addSwipedListener,
      removeSwipedListener,

      isMobileInput,
    ];

    for (const listener of listeners)
      Vue.prototype.$mb[listener.name] = listener;
  },
};

function addSwipeListener(callback, el = document) {
  const pos = { x: null, y: null };
  const move = { x: 0, y: 0 };

  const touchstart = (e) => {
    pos.x = e.touches[0].clientX;
    pos.y = e.touches[0].clientY;
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

  const removeListeners = (e) => {
    if (callback != e.detail) return removeError();
    el.removeEventListener("touchstart", touchstart);
    el.removeEventListener("touchmove", touchmove);
    el.removeEventListener("touchend", touchend);
  };

  el.addEventListener("touchstart", touchstart);
  el.addEventListener("touchmove", touchmove);
  el.addEventListener("touchend", touchend);
  el.addEventListener("removeSwipeListener", removeListeners, { once: true });
}
function removeSwipeListener(callback, el = document) {
  const e = { detail: callback };
  el.dispatchEvent(new CustomEvent("removeSwipeListener", e));
}

function addSwipedListener(callback, el = document) {
  const delay = 200; // ms
  const minMagnitude = 100; // px

  const swipe = (e) => {
    const touchmove = (e) => {
      move.x = pos.x - e.touches[0].clientX;
      move.y = pos.y - e.touches[0].clientY;
    };

    const getMove = (res) => {
      el.addEventListener("touchmove", touchmove, { passive: true });
      el.addEventListener("touchend", () => res(move), { once: true });
      setTimeout(() => res({ x: 0, y: 0 }), delay);
    };

    const getDirection = (move) => {
      const magnitude = Math.sqrt(move.x * move.x + move.y * move.y);
      const isHorisontal = Math.abs(move.x) > Math.abs(move.y);

      if (magnitude < minMagnitude) return null;
      if (isHorisontal) return move.x > 0 ? "right" : "left";
      else return move.y > 0 ? "up" : "down";
    };

    const pos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    const move = { x: 0, y: 0 };

    new Promise(getMove).then((move) => {
      el.removeEventListener("touchmove", touchmove);
      callback(getDirection(move));
    });
  };

  const removeListener = (e) => {
    if (callback !== e.detail) return removeError();
    el.removeEventListener("touchstart", swipe);
  };

  el.addEventListener("touchstart", swipe, { passive: true });
  el.addEventListener("removeSwipedListener", removeListener);
}
function removeSwipedListener(callback, el = document) {
  const e = { detail: callback };
  el.dispatchEvent(new CustomEvent("removeSwipedListener", e));
}

function isMobileInput() {
  return window.matchMedia("(pointer: coarse)").matches;
}

// ! - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function removeError() {
  throw new Error("Failed to remove a listener. No listener has this callback");
}

