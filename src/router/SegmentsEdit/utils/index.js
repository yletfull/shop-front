export const serializeValues = (values) => (
  values
    .map(String)
    .sort()
    .join('')
);

export default {
  serializeValues,
};
