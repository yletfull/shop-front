import { useEffect } from 'react';
import { getFocusableChildren } from './utils/getFocusableChildren';

const keys = {
  tab: 'Tab',
};

const useAllowBodyScroll = function useAllowBodyScroll({
  preventFocusCapture,
  modal,
}) {
  useEffect(() => {
    let focusableChildren = null;
    let firstFocusable = null;
    let lastFocusable = null;
    let moveFocusToLastElement = null;
    let moveFocusToFirstElement = null;

    if (!preventFocusCapture && modal.current) {
      focusableChildren = getFocusableChildren(modal.current);
      if (focusableChildren.length) {
        [firstFocusable] = focusableChildren;
        lastFocusable = focusableChildren[focusableChildren.length - 1];
        firstFocusable.focus();
        moveFocusToLastElement = (e) => {
          if (e.shiftKey && (e.key ? e.key : e.code) === keys.tab) {
            e.preventDefault();
            lastFocusable.focus();
          }
        };
        moveFocusToFirstElement = (e) => {
          if (!e.shiftKey && (e.key ? e.key : e.code) === keys.tab) {
            e.preventDefault();
            firstFocusable.focus();
          }
        };

        firstFocusable.addEventListener('keydown', moveFocusToLastElement);
        lastFocusable.addEventListener('keydown', moveFocusToFirstElement);
      }
    }

    return () => {
      if (firstFocusable && lastFocusable) {
        firstFocusable.removeEventListener('keydown', moveFocusToLastElement);
        lastFocusable.removeEventListener('keydown', moveFocusToFirstElement);
      }
    };
  }, [
    preventFocusCapture,
    modal,
  ]);
};

export default useAllowBodyScroll;
