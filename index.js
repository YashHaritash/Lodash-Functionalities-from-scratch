// #1 - compact

const compact_simple = (arr) => {
  return arr.filter((element) => {
    return (
      element !== false &&
      element !== null &&
      element !== 0 &&
      element !== "" &&
      element !== undefined &&
      !Number.isNaN(element)
    );
  });
};

const compact = (arr) => {
  return arr.filter((element) => {
    return Boolean(element);
  });
};

// Test Case
console.log(compact([0, 1, false, 2, "", 3, undefined, null, NaN]));

console.log("----------------------------------------------------------------");

// #2 - difference

const difference = (arr1, arr2) => {
  return arr1.filter((element) => {
    return !arr2.includes(element);
  });
};

// Test Case
console.log(difference([2, 1], [2, 3]));

console.log("----------------------------------------------------------------");

// #3 - intersection

const uniq_ = (arr) => {
  let temp = new Set(arr);
  return [...temp];
};

const intersection = (arr, ...arrays) => {
  arr = uniq_(arr);
  let ans = arrays.reduce((prev, curr) => {
    return prev.filter((element) => curr.includes(element));
  }, arr);
  return ans;
};

console.log(intersection([2, 2, 2, 1, 3], [2, 2, 2, 3], [2, 3]));
console.log("----------------------------------------------------------------");

// #4 - intersectionBy

// #4.1 - uniqBy
const uniqBy = (arr, iteratee) => {
  const seen = new Set();
  return arr.filter((element) => {
    const value =
      typeof iteratee === "function" ? iteratee(element) : element[iteratee];
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
};

const intersectionBy = (arr1, ...args) => {
  const iteratee = args.pop();
  arr1 = uniqBy(arr1, iteratee);
  return args.reduce((prev, curr) => {
    let arr2 = curr.map((element) =>
      typeof iteratee === "function" ? iteratee(element) : element[iteratee]
    );
    let seen = new Set(arr2);
    return prev.filter((element) => {
      const val =
        typeof iteratee === "function" ? iteratee(element) : element[iteratee];
      return seen.has(val);
    });
  }, arr1);
};

console.log(intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor));
console.log(intersectionBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], "x"));

console.log("----------------------------------------------------------------");

// #5 - uniq

const uniq_old = (arr) => {
  let temp = [];
  return arr.filter((element) => {
    let ans = !temp.includes(element);
    temp.push(element);
    return ans;
  });
};
//the above code is not efficient

const uniq = (arr) => {
  let temp = new Set(arr);
  return [...temp];
};

// Test Case
console.log(uniq([2, 1, 2]));

console.log("----------------------------------------------------------------");

// #6 - groupBy

const groupBy = (arr, iteratee) => {
  const result = {};

  arr.forEach((element) => {
    const key =
      typeof iteratee === "function" ? iteratee(element) : element[iteratee];

    if (key in result) {
      result[key].push(element);
    } else {
      result[key] = [element];
    }
  });

  return result;
};

// Test Case
console.log(groupBy([6.1, 4.2, 6.3], Math.floor));
console.log(groupBy(["one", "two", "three"], "length"));

console.log("----------------------------------------------------------------");

// #7 - keyBy

const keyBy = (arr, iteratee) => {
  return arr.reduce((result, element) => {
    const key =
      typeof iteratee === "function" ? iteratee(element) : element[iteratee];
    result[key] = element;
    return result;
  }, {});
};

// Test Case
var array = [
  { dir: "left", code: 97 },
  { dir: "right", code: 100 },
];
console.log(
  keyBy(array, function (o) {
    return String.fromCharCode(o.code);
  })
);

console.log("----------------------------------------------------------------");

// #8 - debounce

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
};

const sayHello = () => console.log("Hello!");
const debouncedHello = debounce(sayHello, 1000);

debouncedHello();
debouncedHello();
debouncedHello(); // Only this one will run after 1s

//Test Case

setTimeout(() => {
  console.log(
    "----------------------------------------------------------------"
  );
}, 1500);

// #9 - throttle

const throttle = (func, wait) => {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= wait) {
      lastCall = now;
      func(...args);
    }
  };
};

const log = () => console.log("Called!");
const throttledLog = throttle(log, 2000);

throttledLog(); // will run
setTimeout(throttledLog, 1000); // ignored
setTimeout(throttledLog, 2100); // will run

// Test Case
setTimeout(() => {
  console.log(
    "----------------------------------------------------------------"
  );
}, 2500);

console.log("----------------------------------------------------------------");

// #10 - flattenDeep

const flattenDeep = (arr) => {
  return arr.reduce(
    (prev, curr) =>
      Array.isArray(curr) ? prev.concat(flattenDeep(curr)) : prev.concat(curr),
    []
  );
};

// Test Case
console.log(flattenDeep([1, [2, [3, [4]], 5]]));

console.log("----------------------------------------------------------------");

// #11 - pick

const pick = (obj, keys) => {
  return keys.reduce((picked, key) => {
    if (key in obj) {
      picked[key] = obj[key];
    }
    return picked;
  }, {});
};

// Test Case
console.log(pick({ a: 1, b: 2, c: 3 }, ["a", "c"]));

console.log("----------------------------------------------------------------");

// #12 - omit

const omit = (obj, keys) => {
  let filtered = Object.entries(obj).filter(([key, value]) => {
    return !keys.includes(key);
  });
  let ans = Object.fromEntries(filtered);
  return ans;
};

// Test Case
console.log(omit({ a: 1, b: 2, c: 3 }, ["a", "c"]));

console.log("----------------------------------------------------------------");
