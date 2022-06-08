import { InitParams } from "@/components/conference/types";
import store from "@/store";
import {
  Module,
  VuexModule,
  getModule,
  Mutation,
  Action,
} from "vuex-module-decorators";

@Module({ dynamic: true, store, name: "conferenceInitError" })
class ConferenceInitError extends VuexModule {
  isMediaAllowed: boolean | null = null;
  isCaller: boolean | null = null;
  id: string | null = null;

  @Action
  onMediaBlocked({ isCaller, id }: InitParams) {
    this.setIsCaller(isCaller);
    if (id) this.setId(id);
    if (this.isMediaAllowed !== false) this.setMediaAllowed(false);
    alert(
      "Please do allow this website to use your video and audio in order to continue to the conference."
    );
  }

  @Mutation
  setIsCaller(bool: boolean) {
    this.isCaller = bool;
  }
  @Mutation
  setId(id: string) {
    this.id = id;
  }
  @Mutation
  setMediaAllowed(bool: boolean) {
    this.isMediaAllowed = bool;
  }
}

export default getModule(ConferenceInitError);
