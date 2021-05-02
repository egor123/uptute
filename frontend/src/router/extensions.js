const ROLES = ["USER"];

export function createRoutes(prefix = '') {
    const context = require.context('@/views', true, /.vue$/);
    return context.keys().map(key => {
        const component = context(key).default;
        const name = component.name ?? key.replace(/.\/|.vue/g, '');
        const path = prefix + (component.path ?? name.replace(/^.|[A-Z]/g, (c, i) => (i === 0 ? '/' : '_') + c.toLowerCase()));
        const beforeEnter = configurePermissions(component.permisions);
        return { name, path, beforeEnter, component };
    });
}
function configurePermissions(permissions) {
    return (to, from, next) => {
        if (isPermisionsValid(ROLES, getRoles(permissions?.roles))) next();
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
export function redirect(path, redirect) { return { path, redirect } }