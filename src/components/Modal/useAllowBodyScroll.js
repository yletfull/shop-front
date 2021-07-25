import { useEffect } from 'react';

const useScrollDisable = function useScrollDisableModalHook(preventDisable) {
  useEffect(() => {
    if (!preventDisable) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      if (!preventDisable) {
        document.body.style.overflow = '';
      }
    };
  }, [preventDisable]);
};

export default useScrollDisable;
