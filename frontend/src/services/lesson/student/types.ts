import { AxiosResponse } from "axios";
import {
  ParentLog,
  RequestIds,
  TutorDetails,
} from "@/store/modules/lesson/student/types";

export type AxiosIds = AxiosResponse<RequestIds>;
export type AxiosParentLog = AxiosResponse<ParentLog>;
export type AxiosTutorDetails = AxiosResponse<TutorDetails>;
