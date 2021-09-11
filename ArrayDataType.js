"use strict";

/* You need the module.exports when testing in node.  Comment it out when you send your file to the browser */
module.exports = {
  groupById,
  unique,
  filterRangeInPlace,
  filterRange,
  Calculator,
  copySorted,
  sortByAge,
  shuffle,
  getAverageAge,
}; //add all of your function names here that you need for the node mocha tests

function filterRange(arr, a, b) {
  return arr.filter((item) => a <= item && item <= b);
}

function filterRangeInPlace(arr, a, b) {
  for (let i = 0; i < arr.length; i++) {
    let val = arr[i];

    // remove if outside of the interval
    if (val < a || val > b) {
      arr.splice(i, 1);
      i--;
    }
  }
}

function Calculator() {
  this.methods = {
    "-": (a, b) => a - b,
    "+": (a, b) => a + b,
  };

  this.calculate = function (str) {
    let split = str.split(" "),
      a = +split[0],
      op = split[1],
      b = +split[2];

    if (!this.methods[op] || isNaN(a) || isNaN(b)) {
      return NaN;
    }

    return this.methods[op](a, b);
  };

  this.addMethod = function (name, func) {
    this.methods[name] = func;
  };
}

function unique(arr) {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
}

function groupById(array) {
  return array.reduce((obj, value) => {
    obj[value.id] = value;
    return obj;
  }, {});
}

function copySorted(arr) {
  return arr.slice().sort();
}

function sortByAge(arr) {
  arr.sort((a, b) => a.age - b.age);
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function getAverageAge(users) {
  return users.reduce((prev, user) => prev + user.age, 0) / users.length;
}

("use strict");
/* global assert    */
/* comment out the node specific code when going to the browser*/
const assert = require("assert"); //always need this with node
const myExports = require("./w2d4arrayMethods.js"); //with node need the name of your file with your functions here
const groupById = myExports.groupById; //do this for all of the functions used in the Mocha tests
const unique = myExports.unique;
const filterRangeInPlace = myExports.filterRangeInPlace;
const filterRange = myExports.filterRange;
const Calculator = myExports.Calculator;
const copySorted = myExports.copySorted;
const sortByAge = myExports.sortByAge;
const shuffle = myExports.shuffle;
const getAverageAge = myExports.getAverageAge;

/*
Write a function filterRange(arr, a, b) that gets an array arr, looks for elements with values higher or equal to a and lower or equal to b and return a result as an array.
The function should not modify the array. It should return the new array.
*/
describe("filterRange", function () {
  it("returns the filtered values", function () {
    let arr = [5, 3, 8, 1];
    let filtered = filterRange(arr, 1, 4);
    assert.deepEqual(filtered, [3, 1]);
  });

  it("doesn't change the array", function () {
    let arr = [5, 3, 8, 1];
    let filtered = filterRange(arr, 1, 4);
    assert.deepEqual(arr, [5, 3, 8, 1]);
  });
});

/*
Write a function filterRangeInPlace(arr, a, b) that gets an array arr and removes from it all values except those that are between a and b. The test is: a ≤ arr[i] ≤ b.
The function should only modify the array. It should not return anything.
*/
describe("filterRangeInPlace", function () {
  it("returns the filtered values", function () {
    let arr = [5, 3, 8, 1];
    filterRangeInPlace(arr, 1, 4);
    assert.deepEqual(arr, [3, 1]);
  });

  it("doesn't return anything", function () {
    assert.equal(filterRangeInPlace([1, 2, 3], 1, 4), undefined);
  });
});

/* 
Create a constructor function Calculator that creates “extendable” calculator objects.
The task consists of two parts.  (see https://javascript.info/array-methods)
*/
describe("Calculator", function () {
  let calculator;

  before(function () {
    calculator = new Calculator();
  });

  it("calculate(12 + 34) = 46", function () {
    assert.equal(calculator.calculate("12 + 34"), 46);
  });

  it("calculate(34 - 12) = 22", function () {
    assert.equal(calculator.calculate("34 - 12"), 22);
  });

  it("add multiplication: calculate(2 * 3) = 6", function () {
    calculator.addMethod("*", (a, b) => a * b);
    assert.equal(calculator.calculate("2 * 3"), 6);
  });

  it("add power: calculate(2 ** 3) = 8", function () {
    calculator.addMethod("**", (a, b) => a ** b);
    assert.equal(calculator.calculate("2 ** 3"), 8);
  });
});

/* Create a function unique(arr) that should return an array with unique items of arr. */
describe("unique", function () {
  let strings = [
    "Hare",
    "Krishna",
    "Hare",
    "Krishna",
    "Krishna",
    "Krishna",
    "Hare",
    "Hare",
    ":-O",
  ];
  it("tests unique hare krishnas", function () {
    assert.deepEqual(unique(strings), ["Hare", "Krishna", ":-O"]);
  });
});

/*
Let’s say we received an array of users in the form {id:..., name:..., age... }.
Create a function groupById(arr) that creates an object from it, with id as the key, and array items as values.
see example:  https://javascript.info/array-methods
Such function is really handy when working with server data.
In this task we assume that id is unique. There may be no two array items with the same id.
Please use array .reduce method in the solution.
*/
describe("groupById", function () {
  it("creates an object grouped by id", function () {
    let users = [
      { id: "john", name: "John Smith", age: 20 },
      { id: "ann", name: "Ann Smith", age: 24 },
      { id: "pete", name: "Pete Peterson", age: 31 },
    ];

    assert.deepEqual(groupById(users), {
      john: { id: "john", name: "John Smith", age: 20 },
      ann: { id: "ann", name: "Ann Smith", age: 24 },
      pete: { id: "pete", name: "Pete Peterson", age: 31 },
    });
  });

  it("works with an empty array", function () {
    const users = [];
    assert.deepEqual(groupById(users), {});
  });
});

describe("sortByAge", function () {
  it("creates an object grouped by age", function () {
    let users = [
      { id: "john", name: "John Smith", age: 20 },
      { id: "ann", name: "Ann Smith", age: 24 },
      { id: "pete", name: "Pete Peterson", age: 31 },
    ];

    assert.deepEqual(sortByAge(users), {
      20: { id: "john", name: "John Smith", age: 20 },
      24: { id: "ann", name: "Ann Smith", age: 24 },
      31: { id: "pete", name: "Pete Peterson", age: 31 },
    });
  });
  it("works with an empty array", function () {
    const users = [];
    assert.deepEqual(sortByAge(users), {});
  });
});

describe("getAverageAge", function () {
  it("returns the average values", function () {
    let users = [
      { id: "john", name: "John Smith", age: 20 },
      { id: "ann", name: "Ann Smith", age: 40 },
      { id: "pete", name: "Pete Peterson", age: 30 },
    ];
    getAverageAge(users);
    let current = 0;
    assert.deepEqual((prev, user) => users.length, 30);
  });
});

("use strict");
/* eslint-disable */

/* You need the module.exports when testing in node.  Comment it out when you send your file to the browser */
module.exports = {
  ucFirst,
  checkSpam,
  getMaxSubSum,
  truncate,
  camelize,
  extractCurrencyValue,
}; //add all of your function names here that you need for the node mocha tests

function ucFirst(str) {
  let firstElement = str.charAt(0).toUpperCase();
  return firstElement + str.slice(1);
}

function checkSpam(str) {
  let lowercaseStr = str.toUpperCase();
  return lowercaseStr.includes("VIAGRA") || lowercaseStr.includes("XXX");
}

function truncate(str, maxlength) {
  return str.length > maxlength ? str.slice(0, maxlength - 1) + "…" : str;
}

/**
 * 
 * @param {Array} arr of numbers
 * @returns {number} the total of the maximal subarray
 
 */
function getMaxSubSum(arr) {
  let maxSum = 0;
  let partialSum = 0;

  for (let item of arr) {
    // for each item of arr
    partialSum += item; // add it to partialSum
    maxSum = Math.max(maxSum, partialSum); // remember the maximum
    if (partialSum < 0) partialSum = 0; // zero if negative
  }

  return maxSum;
}

function camelize(str) {
  return str
    .split("-") // splits 'my-long-word' into array ['my', 'long', 'word']
    .map(
      // capitalizes first letters of all array items except the first one
      // converts ['my', 'long', 'word'] into ['my', 'Long', 'Word']
      (word, index) =>
        index == 0 ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(""); // joins ['my', 'Long', 'Word'] into 'myLongWord'
}

function extractCurrencyValue(str) {
  return +str.slice(1);
}

("use strict");
/* global assert  ucFirst checkSpam truncate extractCurrencyValue camelize  */
/* comment out the node specific code when going to the browser*/
const assert = require("assert"); //always need this with node
const myExports = require("./w2d4dataTypes.js"); //with node need the name of your file with your functions here
const getMaxSubSum = myExports.getMaxSubSum; //do this for all of the functions used in the Mocha tests
const ucFirst = myExports.ucFirst;
const checkSpam = myExports.checkSpam;
const truncate = myExports.truncate;
const camelize = myExports.camelize;
const extractCurrencyValue = myExports.extractCurrencyValue;

/* eslint-disable quotes */
describe("ucFirst", function () {
  it("Uppercases the first symbol", function () {
    assert.strictEqual(ucFirst("john"), "John");
  });

  it("Doesn't die on an empty string", function () {
    assert.strictEqual(ucFirst(""), "");
  });
});

describe("checkSpam", function () {
  it('finds spam in "buy ViAgRA now"', function () {
    assert.strictEqual(checkSpam("buy ViAgRA now"), true);
  });

  it('finds spam in "free xxxxx"', function () {
    assert.strictEqual(checkSpam("free xxxxx"), true);
  });

  it('no spam in "innocent rabbit"', function () {
    assert.strictEqual(checkSpam("innocent rabbit"), false);
  });
});

/* eslint-enable quotes */
describe("truncate", function () {
  it("truncate the long string to the given length (including the ellipsis)", function () {
    assert.equal(
      truncate("What I'd like to tell on this topic is:", 20),
      "What I'd like to te…"
    );
  });

  it("doesn't change short strings", function () {
    assert.equal(truncate("Hi everyone!", 20), "Hi everyone!");
  });
});

describe("extractCurrencyValue", function () {
  it("for the string $120 returns the number 120", function () {
    assert.strictEqual(extractCurrencyValue("$120"), 120);
  });
});
describe("getMaxSubSum", function () {
  it("maximal subsum of [1, 2, 3] equals 6", function () {
    assert.equal(getMaxSubSum([1, 2, 3]), 6);
  });

  it("maximal subsum of [-1, 2, 3, -9] equals 5", function () {
    assert.equal(getMaxSubSum([-1, 2, 3, -9]), 5);
  });

  it("maximal subsum of [-1, 2, 3, -9, 11] equals 11", function () {
    assert.equal(getMaxSubSum([-1, 2, 3, -9, 11]), 11);
  });

  it("maximal subsum of [-2, -1, 1, 2] equals 3", function () {
    assert.equal(getMaxSubSum([-2, -1, 1, 2]), 3);
  });

  it("maximal subsum of [100, -9, 2, -3, 5] equals 100", function () {
    assert.equal(getMaxSubSum([100, -9, 2, -3, 5]), 100);
  });

  it("maximal subsum of [] equals 0", function () {
    assert.equal(getMaxSubSum([]), 0);
  });

  it("maximal subsum of [-1] equals 0", function () {
    assert.equal(getMaxSubSum([-1]), 0);
  });

  it("maximal subsum of [-1, -2] equals 0", function () {
    assert.equal(getMaxSubSum([-1, -2]), 0);
  });

  it("maximal subsum of [2, -8, 5, -1, 2, -3, 2] equals 6", function () {
    assert.equal(getMaxSubSum([2, -8, 5, -1, 2, -3, 2]), 6);
  });
});

describe("camelize", function () {
  it("leaves an empty line as is", function () {
    assert.equal(camelize(""), "");
  });

  it("turns background-color into backgroundColor", function () {
    assert.equal(camelize("background-color"), "backgroundColor");
  });

  it("turns list-style-image into listStyleImage", function () {
    assert.equal(camelize("list-style-image"), "listStyleImage");
  });

  it("turns -webkit-transition into WebkitTransition", function () {
    assert.equal(camelize("-webkit-transition"), "WebkitTransition");
  });
});
