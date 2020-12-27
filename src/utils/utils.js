export const findPath = (obj, name) => {
  for (let prop in obj) {
    if (prop === name) {
      return name;
    } else if (typeof obj[prop] == "object") {
      var result = findPath(obj[prop], name);
      if (result) {
        return prop + "." + result;
      }
    }
  }
};

export const assocPath = (path, value, obj) => {
  if (path.length === 0) {
    return value;
  }

  let key = path[0];
  if (path.length > 1) {
    const newLevel = Number.isInteger(path[1]) ? [] : {};
    let nextObj = obj && obj[key] ? obj[key] : newLevel;
    value = assocPath(path.slice(1), value, nextObj);
  }

  if (Number.isInteger(key) && Array.isArray(obj)) {
    let result = [...obj];
    console.log(result, "sadasddas");
    return (result[key] = value);
  } else {
    let result = {};
    for (var p in obj) {
      result[p] = obj[p];
    }
    result[key] = value;
    return result;
  }
};

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
