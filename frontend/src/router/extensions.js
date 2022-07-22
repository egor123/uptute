/* EXAMPLE:
import SubRoute from "@src/...";
export default {
  name: "ChooseATutor",              // page's name; default - file's name
  path: "/choose_a_tutor",           // page's URL; default - modified name
  permisions: {                      // default - undefined
    roles: "USER",                   // redirects if roles not valid; can be array; default - "ALL"
    allowedOrigins: "FindATutor",    // redirects if last page not valid; can be array; default - undefined
    redirect: "FindATutor",          // default - "Home"
  },
  children: [                        // nested routes
    {
        compunent: SubRoute,
        path: "/sub_route",
        ...
    },
  ]
}

*/

import { views } from "@/router/indexer";

export const createRoutes = (prefix = "") =>
  Object.keys(views).map((key) => {
    const view = views[key];
    const options = typeof view === "function" ? view.options : view;

    const name = options.name;
    if (!name) throw new Error(`Module ${key} does not have a name specified`);

    const path = prefix + (options.path ?? getPathFromName(name));

    const meta = createMeta(options);

    const children = options.children;

    return { name, path, meta, component: options, children };
  });

const getPathFromName = (name) =>
  name.replace(/^.|[A-Z]/g, (c, i) => (i === 0 ? "/" : "_") + c.toLowerCase());

const createMeta = (component) => ({
  allowedOrigins: convertToPermisions(component.permisions?.allowedOrigins),
  allowedRoles: convertToPermisions(component.permisions?.roles),
  redirect: component.permisions?.redirect || "LogIn",
});

const convertToPermisions = (val) =>
  val == null ? ["ALL"] : Array.isArray(val) ? val : [val];

export const redirect = (path, redirect) => ({ path, redirect });

