import { lines } from './constants';

export const helper = (object) => {
  const result = {};

  Object.values(object).forEach((value) => {
    result[value] = [];
  });

  return result;
};

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
    }, helper(lines))
);
