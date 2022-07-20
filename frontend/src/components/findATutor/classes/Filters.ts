import { Language, Subject } from "@/types";
import {
  Filter as IFilter,
  Filters as IFilters,
  Img,
  IsError,
  Rules,
} from "../types";

import subjectRules from "../rules/subject";
import topicRules from "../rules/topic";
import detailsRules from "../rules/details";
import imgInput from "../rules/imgInput";
import languagesRules from "../rules/languages";
import ageRules from "../rules/age";
import priceRules from "../rules/price";

export class Filters implements IFilters {
  subject = new Filter<Subject>("MATH", subjectRules);
  topic = new Filter<string>("Topic", topicRules);
  details = new Filter<string>("Details", detailsRules);

  // -----------------

  imgs = new Filter<Img[]>([], imgInput);

  // ----------------- these are going to be checked but not rendered

  languages = new Filter<Language[]>(["EN"], languagesRules);
  age = new Filter<[number, number]>([15, 100], ageRules);
  price = new Filter<[number, number]>([0, 150], priceRules);
}

class Filter<T> implements IFilter<T> {
  value: T;
  default: T;
  isError: IsError = {
    color: false,
    animation: false,
  };
  rules: Rules<T>;
  constructor(def: T, rules: Rules<T>) {
    this.value = def;
    this.default = def;
    this.rules = rules;
  }
}
