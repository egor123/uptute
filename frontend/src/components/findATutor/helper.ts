import { Filters } from "./classes/Filters";
import helper from "./helper";
import { Details } from "@/components/account/types";
import StudentLesson from "@/store/modules/lesson/student/module";
import { Grade } from "@/types";

export default {
  // clearErrorStyles: async (filters: Filter<unknown>[]) => {
  //   for (const filter of filters) {
  //     filter.isError.animation = false;
  //     filter.isError.color = false;
  //   }
  // },

  // animateErrors: async (filters: Filter<unknown>[]) => {
  //   for (const filter of filters) filter.isError.animation = false;

  //   await sleep(10);

  //   for (const filter of filters) {
  //     if (!filter.rules(filter.value)) {
  //       filter.isError.animation = true;
  //       filter.isError.color = true;
  //       await sleep(100);
  //     } else filter.isError.color = false;
  //   }

  //   return;
  // },

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
    grade: 1 as Grade, // TODO pull instead of hardcoding
  }),

  // isValid: async (filters: Filters): Promise<boolean> => {
  //   const filtersArr = Object.values(filters);
  //   const isValid = filtersArr.every((f) => f.rules(f.value));

  //   if (isValid) {
  //     helper.clearErrorStyles(filtersArr);
  //     return true;
  //   } else {
  //     await helper.animateErrors(filtersArr);
  //     return false;
  //   }
  // },

  postLessonRequest: async (filters: Filters): Promise<boolean> => {
    const info = helper.getInfo(filters);
    return await StudentLesson.openRequest(info);
  },
};
