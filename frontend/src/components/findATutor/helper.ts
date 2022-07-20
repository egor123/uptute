import { sleep } from "@/utility/methods";
import { Filters } from "./classes/Filters";
import { Filter } from "./types";
import helper from "./helper";
import { Details } from "@/components/account/types";

export default {
  clearErrorStyles: async (filters: Filter<unknown>[]) => {
    for (const filter of filters) {
      filter.isError.animation = false;
      filter.isError.color = false;
    }
  },
  animateErrors: async (filters: Filter<unknown>[]) => {
    for (const filter of filters) filter.isError.animation = false;

    await sleep(10);

    for (const filter of filters) {
      if (!filter.rules(filter.value)) {
        filter.isError.animation = true;
        filter.isError.color = true;
        await sleep(100);
      } else filter.isError.color = false;
    }

    return;
  },
  getValues: (filters: Filters) => ({
    subject: filters.subject.value,
    topic: filters.topic.value,
    details: filters.details.value,
    imgs: filters.imgs.value.map((img) => img.imgUrl),
    age: filters.age.value,
    languages: filters.languages.value,
    price: filters.price.value,
  }),
  getInfo: (filters: Filters) => ({
    ...helper.getValues(filters),
    name: "HardcodedStudent" as string, // TODO pull instead of hardcoding
    grade: 1 as Details.Grade, // TODO pull instead of hardcoding
  }),
};
