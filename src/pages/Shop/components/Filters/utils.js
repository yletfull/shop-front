/* eslint-disable max-len */
export const getCheckboxIsChecked = ({ checkboxesOptions, index, level }) =>
  Boolean(checkboxesOptions[level][index]?.checked) || false;

export const getToggleCheckboxOptions = ({ checkboxesOptions, index, level }) => {
  const checked = getCheckboxIsChecked({ checkboxesOptions, index, level });
  const optionsCopy = checkboxesOptions;
  optionsCopy[level][index] = { checked: !checked };
  return optionsCopy;
};

export const getOptions = (options) => options
  .map((option) => ({
    text: option?.name || option.text,
    value: String(option?.id || option.value) }));

export default {
  getCheckboxIsChecked,
  getToggleCheckboxOptions,
  getOptions,
};
