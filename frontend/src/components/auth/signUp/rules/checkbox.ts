import { Rules } from "../../types";

const rules: Rules<string> = [(v) => !!v || ""];

export default rules;
