import { defaultRating } from '@/constants/rating';

export const getAverageRatingValue = (rating) => {
  if (!rating) {
    return defaultRating;
  }

  const sumRating = rating.reduce((acc, ratingItem) => Number(acc + ratingItem.rate), [0]);
  const averageRating = sumRating / rating.length || defaultRating;
  return averageRating;
};

export default {
  getAverageRatingValue,
};
