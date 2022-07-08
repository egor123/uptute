import { RequestMethod } from "@/store/modules/lesson/tutor/types";
import { apiRequest } from "@/services/api.service.js";

export const req = (method: RequestMethod, url: string, data?: object) =>
  apiRequest({ method, urlEnd: url, data });
