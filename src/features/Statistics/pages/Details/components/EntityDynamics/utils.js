import { lines } from './constants';

const createArraysObject = (object) => {
  const result = {};

  Object.values(object).forEach((value) => {
    result[value] = [];
  });

  return result;
};

const createNumbersObject = (object) => {
  const result = {};

  Object.values(object).forEach((value) => {
    result[value] = 1;
  });

  return result;
};

const checkLengthAfterPoints = (number) => (10 ** Math.ceil(Math.log10(number))).toString().match(/\.(\d+)/)?.[1].length;

const getMultiplier = (max) => {
  let multiplier = 1;
  let tmp = max;
  let length = checkLengthAfterPoints(tmp);

  if (tmp > 0 && tmp < 1 && tmp !== 0) {
    console.log('length', length);
    while (length > 1) {
      multiplier /= 10;
      length -= 1;
    }
  } else if (tmp > 1) {
    while (tmp > 10) {
      multiplier *= 10;
      tmp /= 10;
    }
  }

  return multiplier;
};

const formattedArrayLines = createArraysObject(lines);
const formattedNumberLines = createNumbersObject(lines);

export const getFormattedObject = (data) => (
  Object
    .values(data)
    .reduce((acc, cur) => {
      Object
        .keys(cur)
        .forEach((key) => {
          if (Object.keys(lines).includes(key)) {
            acc[key].push(cur[key]);
          }
        });
      return acc;
    }, formattedArrayLines)
);


export const getMultipliers = (data) => {
  if (typeof data === 'undefined') { return 1; }

  const maxValues = Object
    .keys(data)
    .reduce((acc, cur) => {
      if (data[cur].length === 0) {
        acc[cur] = 0;
      } else {
        acc[cur] = Math.max(...data[cur]);
      }
      return acc;
    }, formattedNumberLines);


  const multiplierCtr = getMultiplier(maxValues.ctr);

  return multiplierCtr;
};
