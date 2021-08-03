import { useEffect } from 'react';

const useKeyPress = function useKeyPressHook({
  key,
  handler,
  event = 'keydown',
  ref = window,
}) {
  useEffect(() => {
    if (!['keydown', 'keyup'].includes(event)) {
      return;
    }

    const element = ref.current || ref;

    if (!element) {
      return;
    }

    const keyPressHandler = (e) => {
      if (!key) {
        return handler(e);
      }

      if (Array.isArray(key) && key.includes(e.key)) {
        return handler(e);
      }

      if (e.key === key) {
        return handler(e);
      }
    };

    element.addEventListener(event, keyPressHandler);

    return () => {
      element.removeEventListener(event, keyPressHandler);
    };
  }, [key, handler, event, ref]);
};

export default useKeyPress;
