import { useEffect } from 'react';

const useScrollDisable = function useScrollDisableModalHook(
  preventDisable,
  ref = document.body,
) {
  useEffect(() => {
    const target = ref.current || ref;

    if (!preventDisable) {
      target.style.overflow = 'hidden';
    }
    return () => {
      if (!preventDisable) {
        target.style.overflow = '';
      }
    };
  }, [preventDisable, ref]);
};

export default useScrollDisable;
