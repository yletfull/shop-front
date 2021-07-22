export const generateNumbers = (current, last, delta = 2) => {
  const left = current - delta;
  const right = current + delta + 1;
  const range = [];
  const rangeWithDots = [];
  let l;

  for (let i = 1; i <= last; i += 1) {
    if (i === 1 || i === last || (i >= left && i < right)) {
      range.push(i);
    }
  }

  range.forEach((item) => {
    if (l) {
      if (item - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (item - l !== 1) {
        rangeWithDots.push('…');
      }
    }
    rangeWithDots.push(item);
    l = item;
  });

  return rangeWithDots;
};

export default {
  generateNumbers,
};
