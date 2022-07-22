type locale = (path: string, params?) => string;
export default locale;

interface params {
  [index: string]: string;
}
