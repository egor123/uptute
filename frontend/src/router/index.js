import Vue from "vue";
import VueRouter from "vue-router";
import { defaultLocale } from "../services/locale.service.js";
import { redirect, createRoutes } from "./extensions.js";
Vue.use(VueRouter);

const routes = [
  redirect("/", `/${defaultLocale}`),
  redirect("*", "Home"),
  ...createRoutes("/:locale"),
];
console.log(...routes);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.name == from.name) return {};
    if (to.hash) return { selector: to.hash };
    return { x: 0, y: 0 };
  },
});

export default router;
