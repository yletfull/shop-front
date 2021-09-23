import { lines } from './constants';

const createArraysObject = (object) => {
  const result = {};

  Object.values(object).forEach((value) => {
    result[value] = [];
  });

  return result;
};

const formattedLines = createArraysObject(lines);

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
    }, formattedLines)
);

export const kek = () => true;
