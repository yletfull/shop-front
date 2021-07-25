import { useEffect } from 'react';
import { getFocusableChildren } from '@/utils/dom';

const tabKey = 'Tab';

const useFocusCapture = function useFocusCaptureModalHook({
  preventFocusCapture,
  ref,
}) {
  useEffect(() => {
    let focusableChildren = null;
    let firstFocusable = null;
    let lastFocusable = null;
    let moveFocusToLastElement = null;
    let moveFocusToFirstElement = null;

    if (!preventFocusCapture && ref.current) {
      focusableChildren = getFocusableChildren(ref.current);
      if (focusableChildren.length) {
        [firstFocusable] = focusableChildren;
        lastFocusable = focusableChildren[focusableChildren.length - 1];
        firstFocusable.focus();
        moveFocusToLastElement = (e) => {
          if (e.shiftKey && (e.key ? e.key : e.code) === tabKey) {
            e.preventDefault();
            lastFocusable.focus();
          }
        };
        moveFocusToFirstElement = (e) => {
          if (!e.shiftKey && (e.key ? e.key : e.code) === tabKey) {
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
    ref,
  ]);
};

export default useFocusCapture;
