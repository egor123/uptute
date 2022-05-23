let localeJSON;
const missingValue = "";
export const defaultLocale = navigator.language.split("-")[0];

export default function(path, params = {}) {
  if (this.$route?.name == undefined) return;
  let text = path
    .split(".")
    .reduce(getValueByElement, getJSON(this.$route, this.$router))
    .toString();
  Object.entries(params)?.forEach(([key, value]) => {
    text = text.replace("${" + key + "}", value);
  });
  return text;
}

function getValueByElement(value, element) {
  if (value === missingValue) return value;
  return value[element] ?? missingValue;
}

function getJSON(route, router) {
  const locale = route.params.locale;
  if (localeJSON === undefined || locale !== localeJSON.id) {
    try {
      localeJSON = require(`@/locales/${locale}.json`);
    } catch {
      localeJSON = require(`@/locales/en.json`);
      router.push({ params: { locale: "en" } });
    }
  }
  return localeJSON;
}
