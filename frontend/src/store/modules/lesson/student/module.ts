import { vm } from "@/main";
import helper from "./helper";
import { sleep } from "@/plugins/utilityMethods.js";

import store from "@/store";
import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";

import { Phase, Info, FetchTutorDetails, AcceptedOffer } from "./types";
import { AcceptedOffer as AcceptedOfferClass } from "./classes/acceptedOffer";

// TODO change name to studentLesson
@Module({ dynamic: true, store, name: "student", namespaced: true })
export class StudentLesson extends VuexModule {
  phase: Phase = "idle";
  info: Info | null = null;
  ids = { log: 0, lesson: 0 };
  acceptedOffer: AcceptedOffer = new AcceptedOfferClass();
  tutors: FetchTutorDetails[] = [];

  // ! --- Actions ---------------------------------------------------------------------------------------

  @Action
  async openRequest(info: Info) {
    this.setPhase("initializing");
    this.updateInfo(info);
    const b: boolean = await this.createLesson();
    if (!b) return false;
    this.loop();
    return true;
  }

  @Action
  async loop() {
    switch (this.phase) {
      case "listening":
        await this.getOffers();
        break;
      case "accepted":
        await this.tryJoinConference();
        break;
      case "idle":
      default:
        return;
    }
    await sleep(1000);
    this.loop();
  }

  @Action
  async rejectOffer(offerLogId: number) {
    helper.close(offerLogId);
  }

  @Action
  async acceptOffer(offerLogId: number) {
    const ids = await helper.acceptOffer(offerLogId);

    if (!ids) return;

    this.setAcceptedLogId(ids.logId);
    this.setPhase("accepted");
  }

  @Action
  public async deleteLesson() {
    this.setPhase("idle");
    return await helper.close(this.ids.log);
  }

  @Action
  private async createLesson(): Promise<boolean> {
    const ids = await helper.create(this.info);

    if (!helper.exitIfFalsy(!!ids, "init")) return false;

    this.setLessonId(ids!.lessonId);
    this.setLogId(ids!.logId);
    this.setPhase("listening");

    return true;
  }

  @Action
  private async getOffers(): Promise<void> {
    const offerLogs = await helper.fetchOffers(this.ids.log);

    if (!helper.exitIfFalsy(!!offerLogs, "offers")) return;

    this.updateTutors(await helper.fetchTutorsDetails(offerLogs));
  }

  @Action
  async tryJoinConference(): Promise<void> {
    const logs = await helper.checkConferenceInit(this.acceptedOffer.ids.log);

    if (!logs) {
      alert(vm.$l("choose_a.tutor.fail.conference"));
      this.setPhase("listening");
      return;
    }

    const initLog = logs.find((log) => log.type === "INIT");

    if (!initLog) return;

    this.setPhase("conference");
    helper.joinConference(initLog);
  }

  // ! --- Mutations -----------------------------------------------------------------------------------------------

  @Mutation
  private setPhase(phase: Phase) {
    this.phase = phase;
  }

  @Mutation
  private updateInfo(info: Info) {
    this.info = { ...this.info, ...info };
  }

  @Mutation
  private setLessonId(lessonId: number) {
    this.ids.lesson = lessonId;
  }

  @Mutation
  private setLogId(logId: number) {
    this.ids.log = logId;
  }

  @Mutation
  private updateTutors(tutors: FetchTutorDetails[]) {
    this.tutors = tutors;
  }

  @Mutation
  private setAcceptedLogId(logId: number) {
    this.acceptedOffer.ids.log = logId;
  }
}

export default getModule(StudentLesson);
