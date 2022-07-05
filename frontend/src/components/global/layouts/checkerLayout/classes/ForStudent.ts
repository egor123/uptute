import { Card, ContainsArr } from "../types";

export class ForStudent implements ContainsArr {
  arr: Card[] = [];

  constructor(vm: Vue) {
    this.arr = [
      {
        img: "whyUpTute/forStudent/piggy-bank",
        title: vm.$l("why_us.student.list.price.h"),
        txt: vm.$l("why_us.student.list.price.p"),
      },
      {
        img: "whyUpTute/forStudent/fast",
        title: vm.$l("why_us.student.list.now.h"),
        txt: vm.$l("why_us.student.list.now.p"),
      },
      {
        img: "whyUpTute/forStudent/friend",
        title: vm.$l("why_us.student.list.understand.h"),
        txt: vm.$l("why_us.student.list.understand.p"),
      },
    ];
  }
}
