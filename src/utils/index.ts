import { difference, pick } from "lodash";

export const deepArrayPick = (arr, deepKeys, pickKeys) => {
  if (difference(deepKeys, pickKeys).length > 0) {
    console.error("Error: pickKeys must contain all of deepKeys");
    return arr;
  }
  return arr.map((a) => {
    const ret = pick(a, pickKeys);
    deepKeys.forEach((k) => {
      if (ret[k]) {
        ret[k] = deepArrayPick(ret[k], deepKeys, pickKeys);
      }
    });
    return ret;
  });
};
