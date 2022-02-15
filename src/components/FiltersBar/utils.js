/* eslint-disable max-len */
export const getCheckboxIsChecked = ({ checkboxesOptions, index, level }) =>
  Boolean(checkboxesOptions[level][index]?.checked) || false;

export const getToggleCheckboxOptions = ({ checkboxesOptions, index, level }) => {
  const checked = getCheckboxIsChecked({ checkboxesOptions, index, level });
  const optionsCopy = checkboxesOptions;
  optionsCopy[level][index] = { checked: !checked };
  return optionsCopy;
};

export const getOptions = (brands) => brands
  .map((brand) => ({ text: brand.name, value: brand.name }));

export default {
  getCheckboxIsChecked,
  getToggleCheckboxOptions,
  getOptions,
};
