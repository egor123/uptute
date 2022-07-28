import { ChildOfDetails, Details as D } from "@/components/account/types";
import { copy } from "@/utility/methods";
import { Source } from "../../types";
import { isChangeValid } from "./isChangeValid";

function _update(source: ChildOfDetails, newV: ChildOfDetails): void;
function _update(source: D.All, newV: ChildOfDetails, key: D.keyofAll): void;
function _update(source: Source, newV: ChildOfDetails, key?: D.keyofAll): void {
  if (ifAll(source, key) && ifKey(key)) {
    const oldV: ChildOfDetails = copy(source[key]);
    source.update({ [key]: newV });
    isChangeValid(source[key]!, oldV);
  } else if (!ifAll(source, key) && !ifKey(key)) {
    const oldVal: ChildOfDetails = copy(source);
    for (const key of Object.keys(source)) source[key].value = newV[key].value;
    isChangeValid(source, oldVal);
  }
}

const ifAll = (source: Source, key?: D.keyofAll): source is D.All => !!key;
const ifKey = (key?: D.keyofAll): key is D.keyofAll => !!key;

export const update = _update;
