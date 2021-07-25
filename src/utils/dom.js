export const getFocusableChildren = (el) => (
  el.querySelectorAll([
    '[contenteditable]:not([tabindex="-1"])',
    '[tabindex]:not([tabindex="-1"])',
    'a[href]:not([tabindex="-1"])',
    'area[href]:not([tabindex="-1"])',
    'button:not([disabled]):not([tabindex="-1"])',
    'embed:not([tabindex="-1"])',
    'iframe:not([tabindex="-1"])',
    'input:not([disabled]):not([tabindex="-1"])',
    'select:not([disabled]):not([tabindex="-1"])',
    'textarea:not([disabled]):not([tabindex="-1"])',
  ].join(','))
);

export default {
  getFocusableChildren,
};
