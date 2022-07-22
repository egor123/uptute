import { Card, ContainsArr } from "../types";

export class ForTutor implements ContainsArr {
  arr: Card[] = [];

  constructor(vm: Vue) {
    this.arr = [
      {
        img: "whyUpTute/forTutor/goal",
        title: vm.$l("why_us.tutor.list.not_just.h"),
        txt: vm.$l("why_us.tutor.list.not_just.p"),
      },
      {
        img: "whyUpTute/forTutor/money-bag",
        title: vm.$l("why_us.tutor.list.salary.h"),
        txt: vm.$l("why_us.tutor.list.salary.p"),
      },
      {
        img: "whyUpTute/forTutor/algorithm",
        title: vm.$l("why_us.tutor.list.price.h"),
        txt: vm.$l("why_us.tutor.list.price.p"),
      },
      {
        img: "whyUpTute/forTutor/time-management",
        title: vm.$l("why_us.tutor.list.flexible.h"),
        txt: vm.$l("why_us.tutor.list.flexible.p"),
      },
    ];
  }
}
