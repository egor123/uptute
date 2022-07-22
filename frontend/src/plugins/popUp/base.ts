import { vm } from "@/main";
import Module from "@/store/modules/popUp/popUp";
import { Props, Value } from "@/store/modules/popUp/types";

type responce<T> = (value: T) => void;
const listen = {
  start: (r: responce<unknown>) => vm.$root.$on("popUpAnswer", r),
  stop: () => vm.$off("popUpAnswer"),
};

const popUp = async <T>(props: Partial<Props>, returns: Value) => {
  Module.setProps(props);
  Module.setIfVisible(true);

  const answer = await new Promise(listen.start);
  listen.stop();

  if (typeof answer === returns) return answer as T;
  else throw new Error(`${answer} is not a valid answer type in this case!`);
};

export default { popUp };
