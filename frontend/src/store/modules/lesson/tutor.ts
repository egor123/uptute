import {
  sendOffer,
  cancelOffer,
  getRawLessons,
  getStudent,
  getLogWithAccepted,
  initConference,
} from "@/services/lesson/tutor.service";
import router from "@/router";
import axios, { AxiosResponse } from "axios";
import Conference from "@/store/modules/conference/main";
import { vm } from "@/main";

import store from "@/store";
import {
  Module,
  VuexModule,
  getModule,
  Mutation,
  Action,
} from "vuex-module-decorators";
import {
  ExitIfNull,
  Lesson,
  LessonIds,
  Lessons,
  LessonWithOffer,
  Phase,
  PLesson,
  RawLesson,
} from "./types";
import {
  AxiosInit,
  AxiosLogWithAccepted,
  LessonLog,
} from "@/services/lesson/types";

@Module({ dynamic: true, store, name: "tutorLesson", namespaced: true })
class TutorLesson extends VuexModule {
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
    const getLesson = (): Lesson => {
      const l = this.lessons.open.find((el) => el.lessonId == lessonIds.lesson);
      if (l) return l;
      throw new Error(`lesson is ${l}`);
    };

    const lesson: Lesson = getLesson();
    const res = await sendOffer(lessonIds.log);
    if (!this.exitIfFalsy({ data: res, name: "send" })) return;
    this.addOfferedLesson({ ...lesson, offerLogId: res.data.logId });
  }

  @Action
  public async cancelOffer(offerLogId: number): Promise<void> {
    const r = await cancelOffer(offerLogId);
    if (r.statusText === "OK") this.deleteOfferedLesson(offerLogId);
    alert(vm.$l("choose_a.student.fail.cancel"));
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
    await new Promise((r) => setTimeout(r, 1000));
    this.loop();
  }

  @Action
  private async getLessons(): Promise<void> {
    const normalize = (l: RawLesson): PLesson =>
      Object.assign(l, { details: JSON.parse(l.details.replace("/", "")) });

    const getStudentInfo = async (lessons: PLesson[]): Promise<Lesson[]> => {
      const addStudentInfo = async (l: PLesson): Promise<Lesson> => {
        const student = await getStudent(l.studentUUID);
        return { ...l, details: Object.assign(l.details, student.data) };
      };

      return await axios.all(lessons.map(addStudentInfo));
    };

    await getRawLessons()
      .then((axios) => axios.data.lessons.map(normalize))
      .then(async (pLessons) => await getStudentInfo(pLessons))
      .then((lessons) => lessons.forEach(this.addLesson))
      .catch(() => this.exitIfFalsy({ data: null, name: "lessons" }));
  }

  @Action
  private async listenForAccepted(): Promise<void> {
    const getLogArr = async (): Promise<AxiosLogWithAccepted[]> => {
      const request = async (lesson: LessonWithOffer) => {
        const log = await getLogWithAccepted(lesson.offerLogId);
        return log.data ? log : this.deleteOfferedLesson(lesson.offerLogId);
      };

      return await axios
        .all(this.lessons.offered.map((lesson) => request(lesson)))
        .then((arr) => arr.filter((r) => r))
        .then((arr) => arr.map((r) => r!));
    };

    const getAcceptedLog = (logs: AxiosResponse<LessonLog>[]) =>
      logs.find((log) => log.data.childLogs.some((c) => c.type == "ACCEPTED"));

    const getAcceptedLogId = (acceptedLog: AxiosResponse<LessonLog>) =>
      acceptedLog.data.childLogs.find((c) => c.type === "ACCEPTED")!.id;

    const cancelOtherLessons = async (lessonId: number) => {
      this.deleteOfferedLesson(await this.getOfferLogIdByLessonId(lessonId));
      this.lessons.offered.forEach((l) => this.cancelOffer(l.offerLogId));
    };
    const notifyStudent = async (acceptedLogId: number, roomId: string) => {
      const r: AxiosInit = await initConference(acceptedLogId, roomId);
      if (r.statusText == "OK") return true;
      this.setPhase("listening");
      return false;
    };

    const logArr = await getLogArr();
    const acceptedLog = getAcceptedLog(logArr);

    if (!acceptedLog) return;

    this.setPhase("accepted");
    const acceptedLogId = getAcceptedLogId(acceptedLog);
    cancelOtherLessons(acceptedLog.data.lessonId);

    await Conference.init({ isCaller: true });
    const roomId: string | undefined = Conference.roomRef?.id;

    if (!this.exitIfFalsy({ data: roomId, name: "conference" })) return;

    const bool: boolean = await notifyStudent(acceptedLogId, roomId!);

    if (!this.exitIfFalsy({ data: bool, name: "conference" })) return;

    router.push({ path: "conference" });
    this.setPhase("conference");
  }

  @Action
  private exitIfFalsy({ data, name }: ExitIfNull): boolean {
    const deleteAllOffers = async () => {
      axios.all(this.lessons.offered.map((o) => cancelOffer(o.offerLogId)));
    };

    if (data) return true;

    alert(vm.$l(`choose_a.student.fail.${name}`));
    this.setPhase("idle");
    deleteAllOffers();

    router.go(-1);
    return false;
  }

  @Action
  private getOfferLogIdByLessonId(lessonId: number): number {
    const offerLogId = this.lessons.offered.find((l) => l.lessonId)?.offerLogId;
    if (offerLogId) return offerLogId;
    throw new Error(`Lesson with lesson id ${lessonId} does not exist`);
  }

  // ! --- Mutations -------------------------------------------------------------------------

  @Mutation
  public setPhase(phase: Phase) {
    this.phase = phase;
  }

  @Mutation
  private addLesson(lesson: Lesson) {
    if (!this.lessons.open.find((l) => l.lessonId == lesson.lessonId))
      this.lessons.open.push(lesson);
  }

  @Mutation
  private addOfferedLesson(lesson: LessonWithOffer) {
    this.lessons.offered.push(lesson);
  }

  @Mutation
  private deleteOfferedLesson(offerLogId: number) {
    const isNotToDelete = (lesson: LessonWithOffer): boolean =>
      lesson.offerLogId != offerLogId;

    this.lessons.offered = this.lessons.offered.filter(isNotToDelete);
  }
}

export default getModule(TutorLesson);
