// Converted the functions into object methods which can be imported into other files and used
const yash = {
  compact: (arr) => arr.filter(Boolean),

  difference: (arr1, arr2) => arr1.filter((el) => !arr2.includes(el)),

  uniq: (arr) => [...new Set(arr)],

  intersection: (arr, ...arrays) => {
    arr = [...new Set(arr)];
    return arrays.reduce(
      (prev, curr) => prev.filter((el) => curr.includes(el)),
      arr
    );
  },

  uniqBy: (arr, iteratee) => {
    const seen = new Set();
    return arr.filter((el) => {
      const val = typeof iteratee === "function" ? iteratee(el) : el[iteratee];
      if (seen.has(val)) return false;
      seen.add(val);
      return true;
    });
  },

  intersectionBy: (arr1, ...args) => {
    const iteratee = args.pop();
    arr1 = yash.uniqBy(arr1, iteratee);
    return args.reduce((prev, curr) => {
      const currVals = curr.map((el) =>
        typeof iteratee === "function" ? iteratee(el) : el[iteratee]
      );
      const set = new Set(currVals);
      return prev.filter((el) => {
        const val =
          typeof iteratee === "function" ? iteratee(el) : el[iteratee];
        return set.has(val);
      });
    }, arr1);
  },

  groupBy: (arr, iteratee) => {
    return arr.reduce((result, el) => {
      const key = typeof iteratee === "function" ? iteratee(el) : el[iteratee];
      (result[key] = result[key] || []).push(el);
      return result;
    }, {});
  },

  keyBy: (arr, iteratee) => {
    return arr.reduce((result, el) => {
      const key = typeof iteratee === "function" ? iteratee(el) : el[iteratee];
      result[key] = el;
      return result;
    }, {});
  },

  debounce: (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  throttle: (func, wait) => {
    let lastCall = 0;
    return (...args) => {
      const now = Date.now();
      if (now - lastCall >= wait) {
        lastCall = now;
        func(...args);
      }
    };
  },

  flattenDeep: (arr) =>
    arr.reduce(
      (prev, curr) =>
        Array.isArray(curr)
          ? prev.concat(yash.flattenDeep(curr))
          : prev.concat(curr),
      []
    ),

  pick: (obj, keys) =>
    keys.reduce((res, key) => {
      if (key in obj) res[key] = obj[key];
      return res;
    }, {}),

  omit: (obj, keys) =>
    Object.fromEntries(
      Object.entries(obj).filter(([key]) => !keys.includes(key))
    ),
};

module.exports = yash;
