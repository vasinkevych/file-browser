export const getValue = (path, obj) => {
  const key = path[0];
  const nextLevel = obj && obj[key];
  let value = obj ? obj[key] : null;

  if (path.length > 1) {
    value = getValue(path.slice(1), nextLevel);
  }

  return value;
};

export const isFn = (fn) => typeof fn === "function";

export const filterMap = (arr, filterFn, mapFn) => {
  return arr.reduce((acc, curr, i) => {
    if (isFn(filterFn) && filterFn(curr, i)) {
      const mappedEl = isFn(mapFn) ? mapFn(curr, i) : curr;
      return [...acc, mappedEl];
    }
    return acc;
  }, []);
};
