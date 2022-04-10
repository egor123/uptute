import { apiRequest } from "@/services/api.service.js";

export default {
  async getUserDetails() {
    return await apiRequest({
      method: "get",
      urlEnd: "/account/me",
    });
  },
  async updateUserDetails({ data }) {
    console.log(data);
    return await apiRequest({
      method: "patch",
      urlEnd: "/account/me",
      data,
    });
  },
};
