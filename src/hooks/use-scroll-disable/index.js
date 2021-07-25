import { useEffect } from 'react';

const useScrollDisable = function useScrollDisableModalHook(
  preventDisable,
  ref = document.body,
) {
  useEffect(() => {
    const target = ref.current || ref;
    const defaultOverflow = target.style.overflow || '';

    if (!preventDisable) {
      target.style.overflow = 'hidden';
    }
    return () => {
      if (!preventDisable) {
        target.style.overflow = defaultOverflow;
      }
    };
  }, [preventDisable, ref]);
};

export default useScrollDisable;
