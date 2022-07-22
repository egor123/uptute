import { Language, Subject } from "@/types";
import { Filters as IFilters, Img } from "../types";
import { ValidatableField as Field } from "@/utility/classes/ValidatableField";

import subjectRules from "../rules/subject";
import topicRules from "../rules/topic";
import detailsRules from "../rules/details";
import imgInput from "../rules/imgInput";
import languagesRules from "../rules/languages";
import ageRules from "../rules/age";
import priceRules from "../rules/price";

export class Filters implements IFilters {
  subject = new Field<Subject>("MATH", subjectRules);
  topic = new Field<string>("Topic", topicRules);
  details = new Field<string>("Details", detailsRules);

  // -----------------

  imgs = new Field<Img[]>([], imgInput);

  // ----------------- these are going to be checked but not rendered

  languages = new Field<Language[]>(["EN"], languagesRules);
  age = new Field<[number, number]>([15, 100], ageRules);
  price = new Field<[number, number]>([0, 150], priceRules);
}
