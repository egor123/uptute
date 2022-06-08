import { InitParams } from "@/components/conference/types";
import store from "@/store";
import {
  Module,
  VuexModule,
  getModule,
  Mutation,
} from "vuex-module-decorators";

@Module({ dynamic: true, store, name: "conferenceInitError" })
class ConferenceInitError extends VuexModule {
  isMediaAllowed: boolean | null = null;
  isCaller: boolean | null = null;
  id: string | null = null;

  @Mutation
  onMediaBlocked({ isCaller, id }: InitParams) {
    this.isCaller = isCaller;
    if (id) this.id = id;
    if (this.isMediaAllowed !== false) this.isMediaAllowed = false;
    alert(
      "Please do allow this website to use your video and audio in order to continue to the conference."
    );
  }
}

export default getModule(ConferenceInitError);
