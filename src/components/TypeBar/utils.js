/* eslint-disable max-len */
export const getCheckboxIsChecked = ({ checkboxesOptions, index, level }) =>
  checkboxesOptions[level][index]?.checked || false;

export const toggleCheckbox = ({ checkboxesOptions, index, level }) => {
  const checked = getCheckboxIsChecked({ checkboxesOptions, index, level });
  const optionsCopy = checkboxesOptions;
  optionsCopy[level][index] = { checked: !checked };
  return optionsCopy;
};

export default {
  getCheckboxIsChecked,
  toggleCheckbox,
};
