import { useState, useRef, useCallback } from 'react';
import axios from 'axios';

const useService = function useServiceHook({
  initialData = null,
  autoCancel = true,
  service,
} = {}) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(initialData);
  const cancelTokenSource = useRef(null);

  const cancel = () => {
    try {
      cancelTokenSource.current.cancel();
    } catch (thrown) {
      // do nothing
    }
  };

  const fetch = useCallback(async (params) => {
    if (autoCancel) {
      cancel();
    }

    cancelTokenSource.current = axios.CancelToken.source();

    setIsFetching(true);
    setError(null);

    try {
      const response = await service(
        params,
        { cancelToken: cancelTokenSource.current.token },
      );

      setData(response);
      setIsFetching(false);
    } catch (thrown) {
      if (!axios.isCancel(thrown)) {
        setIsFetching(false);
        setError(thrown);
      }
    }
  }, [autoCancel, service]);

  return {
    fetch,
    cancel,

    isFetching,
    error,
    data,
  };
};

export default useService;
