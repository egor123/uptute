import { Props } from "@/store/modules/popUp/types";
import base from "./base";

export default {
  confirm: async (title: string): Promise<boolean> => {
    const props: Partial<Props> = {
      title,
      buttons: booleanButtons,
    };

    return await base.popUp<boolean>(props, "boolean");
  },
  warn: async (title: string): Promise<boolean> => {
    const props: Partial<Props> = {
      title,
      buttons: booleanButtons,
      backgroundColor: "error",
    };

    return await base.popUp<boolean>(props, "boolean");
  },
};

const booleanButtons = [
  { text: "✔", value: true },
  { text: "✘", value: false },
];