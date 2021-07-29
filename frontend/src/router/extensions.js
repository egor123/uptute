const ROLES = ["USER"]; //TO DO!!!!!!!!

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

export function createRoutes(prefix = '') {
    const context = require.context('@/views', true, /.vue$/);
    return context.keys().map(key => {
        const component = context(key).default;
        const name = component.name ?? key.replace(/.\/|.vue/g, '');
        const path = prefix + (component.path ?? name.replace(/^.|[A-Z]/g, (c, i) => (i === 0 ? '/' : '_') + c.toLowerCase()));
        const beforeEnter = configurePermissions(component.permisions);
        const children = component.children;
        return { name, path, beforeEnter, component, children };
    });
}

function configurePermissions(permissions) {
    return (to, from, next) => {
        if (isPermisionsValid(ROLES, getRoles(permissions?.roles)) && isOriginValid(from?.name, permissions?.allowedOrigins)) next();
        else next(getRedirect(permissions?.redirect));
    }
}

function getRoles(roles) {
    if (roles == undefined) return ["ALL"];
    if (Array.isArray(roles)) return roles;
    return [roles];
}
function getRedirect(to) {
    if (to == undefined) return { name: "Home" };
    if (to.includes('/')) return { path: to };
    return { name: to };
}
function isPermisionsValid(roles, permisions) {
    if (permisions.includes("ALL")) return true;
    for (var role of roles) if (permisions.includes(role)) return true;
    return false;
}
function isOriginValid(origin, allowedOrigin) {
    if (allowedOrigin === undefined || origin === undefined) return true;
    if (Array.isArray(allowedOrigin)) return allowedOrigin.includes(origin);
    return allowedOrigin == origin;
}
export function redirect(path, redirect) { return { path, redirect } }