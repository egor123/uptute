import { Card, ContainsArr } from "../types";

export class HowItWorks implements ContainsArr {
  arr: Card[] = [];

  constructor(vm: Vue) {
    this.arr = [
      {
        img: "howItWorks/filter",
        title: vm.$l("home.how_it_works.list.filters.h"),
        txt: vm.$l("home.how_it_works.list.filters.p"),
      },
      {
        img: "howItWorks/choosing",
        title: vm.$l("home.how_it_works.list.choose.h"),
        txt: vm.$l("home.how_it_works.list.choose.p"),
      },
      {
        img: "howItWorks/notebook",
        title: vm.$l("home.how_it_works.list.lesson.h"),
        txt: vm.$l("home.how_it_works.list.lesson.p"),
      },
      {
        img: "howItWorks/rating",
        title: vm.$l("home.how_it_works.list.rate.h"),
        txt: vm.$l("home.how_it_works.list.rate.p"),
      },
    ];
  }
}
