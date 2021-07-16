import { useState, useEffect } from 'react';
import axios from 'axios';
import service from '../../service';

const UseFetch = function UseFetch({
  entity,
  preventRequest,
  dateStart,
  dateEnd,
}) {
  const [list, setList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (preventRequest) {
      setIsFetching(false);
      setError(null);
      return () => {};
    }

    const source = axios.CancelToken.source();

    const fetchData = async () => {
      setIsFetching(true);
      setError(null);

      const params = {
        dateStart,
        dateEnd,
      };

      try {
        const response = await service.fetchList({
          entity,
          params,
          cancelToken: source.token,
        });

        setList(response?.data?.data || []);
        setIsFetching(false);
      } catch (thrown) {
        if (!axios.isCancel(thrown)) {
          setIsFetching(false);
          setError(thrown);
        }
      }
    };

    fetchData();

    return () => {
      try {
        source.cancel();
      } catch (thrown) {
        // do nothing
      }
    };
  }, [entity, preventRequest, dateStart, dateEnd]);

  return {
    list,
    isFetching,
    error,
  };
};

export default UseFetch;
