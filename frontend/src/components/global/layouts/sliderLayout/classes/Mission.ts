import Vue from "vue";

export class Mission {
  _arr: { img: string; txt: string }[] = [];

  get arr() {
    if (this._arr.length % 2 === 0)
      this._arr.push({ txt: "", img: "happiness" });
    return this._arr;
  }

  constructor(vm: Vue) {
    this._arr = [
      {
        img: "happiness",
        txt: vm.$l("home.mission.list.process"),
      },
      {
        img: "heart",
        txt: vm.$l("home.mission.list.passion"),
      },
      {
        img: "coins",
        txt: vm.$l("home.mission.list.affordable"),
      },
    ];
  }
}
