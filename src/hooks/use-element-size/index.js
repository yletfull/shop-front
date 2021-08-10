import { useState, useEffect } from 'react';

const useElementSize = function useElementSizeHook(target) {
  const [size, setSize] = useState([0, 0]);

  useEffect(() => {
    if (!target || !target.current) {
      return;
    }

    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver((entries) => {
        const [entry] = entries;

        setSize([
          entry.contentRect.width,
          entry.contentRect.height,
        ]);
      });

      resizeObserver.observe(target.current || target);

      return () => {
        resizeObserver.disconnect();
      };
    }

    const handleWindowResize = () => {
      const { height, width } = (target.current || target)
        .getBoundingClientRect();

      setSize([width, height]);
    };

    window.addEventListener('resize', handleWindowResize);
    handleWindowResize();

    return () => window.removeEventListener('resize', handleWindowResize);
  }, [target]);

  return size;
};

export default useElementSize;
