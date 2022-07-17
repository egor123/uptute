import { VueConstructor } from "vue";
import Module from "@/store/modules/popUp/popUp";
import { vm } from "@/main";

export default {
  install(Vue: VueConstructor<Vue>) {
    Vue.prototype.$pop = new Vue();

    Vue.prototype.$pop.confirm = popUps.confirm;
  },
};

const popUps = {
  confirm: async (title: string): Promise<boolean> => {
    Module.setTitle(title);
    console.warn(Module.title);
    Module.setButtons([
      { text: "✓", name: "true" },
      { text: "✘", name: "false" },
    ]);
    Module.setBackgrounColor("error");

    const answer = await new Promise((r) =>
      vm.$root.$on("popUpAnswer", (answer: string) => r(answer))
    );

    switch (answer) {
      case "true":
        return true;
      case "false":
        return false;
      default:
        throw new Error(`${answer} is not a valid answer!`);
    }
  },
};
