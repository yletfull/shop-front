import { useEffect } from 'react';

// FIXME: re-init on key, handler or event change
const useKeyPress = function useKeyPressHook(
  key,
  handler,
  event = 'keydown',
) {
  const keyPressHandler = (e) => {
    if (e.key === key) {
      handler();
    }
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!['keydown', 'keyup'].includes(event)) {
      return;
    }

    window.addEventListener(event, keyPressHandler);
    return () => {
      window.removeEventListener(event, keyPressHandler);
    };
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */
};

export default useKeyPress;
