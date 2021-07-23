import { useEffect } from 'react';

const useAllowBodyScroll = function useAllowBodyScroll(allowBodyScroll) {
  useEffect(() => {
    if (!allowBodyScroll) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      if (!allowBodyScroll) {
        document.body.style.overflow = '';
      }
    };
  }, [allowBodyScroll]);
};

export default useAllowBodyScroll;
