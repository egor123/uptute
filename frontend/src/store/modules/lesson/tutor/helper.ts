import Module, { TutorLesson } from "@/store/modules/lesson/tutor/module";
import server from "@/services/lesson/tutor.service";
import axios, { AxiosResponse } from "axios";
import { Lesson, LessonWithOffer, LessonWithoutStudent } from "./types";
import { vm } from "@/main";
import {
  AxiosInit,
  AxiosLogWithAccepted,
  LessonLog,
} from "@/services/lesson/types";

const exports = {
  exitIfFalsy: (bool: boolean, name: string): boolean => {
    if (bool) return true;

    alert(vm.$l(`choose_a.student.fail.${name}`));
    Module.clearAll();
    vm.$router.go(-1);
    return false;
  },

  cancelAllOffers: () => {
    const offeredLessons: LessonWithOffer[] = Module.lessons.offered;
    axios.all(offeredLessons.map((o) => server.cancelOffer(o.offerLogId)));
  },

  getOfferLogIdByLessonId: (lessonId: number): number => {
    const offeredLessons = Module.lessons.offered;
    const offerLogId = offeredLessons.find((l) => l.lessonId)?.offerLogId;
    if (offerLogId) return offerLogId;
    throw new Error(`Lesson with lesson id ${lessonId} does not exist`);
  },

  getLesson: (lessonId: number): Lesson => {
    const l = exports.tryGetLesson(lessonId);
    if (l) return l;
    throw new Error(`lesson is ${l}`);
  },

  tryGetLesson: (lessonId: number): Lesson | undefined => {
    return Module.lessons.open.find((el) => el.lessonId == lessonId);
  },

  addStudentInfo: async (
    lessons: LessonWithoutStudent[]
  ): Promise<Lesson[]> => {
    const addStudentInfo = async (l: LessonWithoutStudent): Promise<Lesson> => {
      const student = await server.getStudent(l.studentUUID);
      return { ...l, details: Object.assign(l.details, student.data) };
    };

    return await axios.all(lessons.map(addStudentInfo));
  },

  getAcceptedLog: {
    arr: async (): Promise<AxiosLogWithAccepted[]> => {
      const request = async (lesson: LessonWithOffer) => {
        const log = await server.getLogWithAccepted(lesson.offerLogId);
        return log.data ? log : null;
      };

      return await axios
        .all(Module.lessons.offered.map((lesson) => request(lesson)))
        .then((arr) => arr.filter((r) => r) as AxiosLogWithAccepted[]);
    },

    single: (logs: AxiosLogWithAccepted[]): AxiosLogWithAccepted | undefined =>
      logs.find((log) => log.data.childLogs.some((c) => c.type == "ACCEPTED")),

    id: (acceptedLog: AxiosResponse<LessonLog>): number | undefined =>
      acceptedLog.data.childLogs.find((c) => c.type === "ACCEPTED")?.id,
  },

  cancelOtherLessons: async (lessonId: number) => {
    const offerLogId: number = exports.getOfferLogIdByLessonId(lessonId);
    const offeredLessons: LessonWithOffer[] = Module.lessons.offered;
    const others = offeredLessons.filter((l) => l.offerLogId != offerLogId);
    others.forEach((l) => Module.cancelOffer(l.offerLogId));
  },

  notifyStudent: async (acceptedLogId: number, roomId: string) => {
    const r: AxiosInit = await server.initConference(acceptedLogId, roomId);
    return r.statusText === "OK";
  },
};

export default exports;
