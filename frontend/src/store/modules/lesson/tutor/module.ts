import server from "@/services/lesson/tutor.service";
import router from "@/router";
import Conference from "@/store/modules/conference/main";
import { sleep } from "@/plugins/utilityMethods.js";

import store from "@/store";
import {
  Module,
  VuexModule,
  getModule,
  Mutation,
  Action,
} from "vuex-module-decorators";
import {
  Lesson,
  LessonIds,
  Lessons,
  LessonWithOffer,
  Phase,
  LessonWithoutStudent,
  RawLesson,
} from "./types";
import helper from "./helper";

@Module({ dynamic: true, store, name: "tutorLesson", namespaced: true })
export class TutorLesson extends VuexModule {
  private phase: Phase = "idle";
  public lessons: Lessons = { open: [], offered: [] };

  // ! --- Actions ---------------------------------------------------------------------------

  @Action
  public async initSearch(): Promise<void> {
    this.setPhase("listening");
    this.loop();
  }

  @Action
  public async sendOffer(lessonIds: LessonIds): Promise<void> {
    const lesson: Lesson = helper.getLesson(lessonIds.lesson);
    const r = await server.sendOffer(lessonIds.log);

    if (!helper.exitIfFalsy(r.statusText == "OK", "send")) return;

    this.moveLessonFromOpenToOffered({ ...lesson, offerLogId: r.data.logId });
  }

  @Action
  public cancelOffer(offerLogId: number): void {
    server.cancelOffer(offerLogId);
    this.deleteOfferedLesson(offerLogId);
  }

  @Action
  private async loop(): Promise<void> {
    switch (this.phase) {
      case "listening":
        this.getLessons();
        this.listenForAccepted();
        break;
      case "idle":
      default:
        return;
    }
    await sleep(1000);
    this.loop();
  }

  @Action
  private async getLessons(): Promise<void> {
    const normalize = (l: RawLesson): LessonWithoutStudent =>
      Object.assign(l, { details: JSON.parse(l.details.replace("/", "")) });

    await server
      .getRawLessons()
      .then((axios) => axios.data.lessons.map(normalize))
      .then(helper.addStudentInfo)
      .then((lessons) => lessons.forEach(this.addOpenLesson))
      .catch(() => helper.exitIfFalsy(false, "lessons"));
  }

  @Action
  private async listenForAccepted(): Promise<void> {
    const logArr = await helper.getAcceptedLog.arr();
    const acceptedLog = helper.getAcceptedLog.single(logArr);

    if (!acceptedLog) return;

    this.setPhase("accepted");
    const acceptedLogId = helper.getAcceptedLog.id(acceptedLog)!;
    helper.cancelOtherLessons(acceptedLog.data.lessonId);

    await Conference.init({ isCaller: true });
    const roomId: string | undefined = Conference.roomRef?.id;

    if (!helper.exitIfFalsy(!!roomId, "conference")) return;

    const bool = await helper.notifyStudent(acceptedLogId, roomId!);

    if (!helper.exitIfFalsy(bool, "conference"))
      return this.setPhase("listening");

    router.push({ path: "conference" });
    this.setPhase("conference");
  }

  @Action
  private moveLessonFromOpenToOffered(lesson: LessonWithOffer): void {
    this.deleteOpenLesson(lesson.logId);
    this.addOfferedLesson(lesson);
  }

  @Action
  public clearAll() {
    this.setPhase("idle");
    helper.cancelAllOffers();
  }

  // ! --- Mutations -------------------------------------------------------------------------

  @Mutation
  private setPhase(phase: Phase) {
    this.phase = phase;
  }

  @Mutation
  private addOpenLesson(lesson: Lesson) {
    if (!helper.tryGetLesson(lesson.lessonId)) this.lessons.open.push(lesson);
  }

  @Mutation
  private addOfferedLesson(lesson: LessonWithOffer) {
    this.lessons.offered.push(lesson);
  }

  @Mutation
  private deleteOpenLesson(lessonLogId: number) {
    const isNotToDelete = (lesson: Lesson): boolean =>
      lesson.logId != lessonLogId;

    this.lessons.open = this.lessons.open.filter(isNotToDelete);
  }

  @Mutation
  private deleteOfferedLesson(offerLogId: number) {
    const isNotToDelete = (lesson: LessonWithOffer): boolean =>
      lesson.offerLogId != offerLogId;

    this.lessons.offered = this.lessons.offered.filter(isNotToDelete);
  }
}

export default getModule(TutorLesson);
