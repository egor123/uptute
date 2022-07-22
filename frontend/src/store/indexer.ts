import { Module } from "vuex";

import account from "./modules/account";
import auth from "./modules/auth";
import chooseATutor from "./modules/chooseATutor";
import lessons from "./modules/lessons";
import navigation from "./modules/navigation";
// import student from "./modules/student";

const modules: { [index: string]: Module<unknown, unknown> } = {
  account,
  auth,
  chooseATutor,
  lessons,
  navigation,
  // student,
};

export const getModules = () => modules;
