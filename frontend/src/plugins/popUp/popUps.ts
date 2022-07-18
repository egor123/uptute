import { Props } from "@/store/modules/popUp/types";
import base from "./base";

export default {
  confirm: async (title: string): Promise<boolean> => {
    const props: Partial<Props> = {
      title,
      buttons: [
        { text: "✔", value: true },
        { text: "✘", value: false },
      ],
      backgroundColor: "error",
    };

    return await base.popUp<boolean>(props, "boolean");
  },
};
