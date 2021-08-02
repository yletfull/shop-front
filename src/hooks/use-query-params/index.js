import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const useQueryParams = function useQueryParamsHook() {
  const history = useHistory();
  const { search } = useLocation();

  const [params, setParams] = useState({});

  useEffect(() => {
    if (!search) {
      return;
    }
    setParams([...new URLSearchParams(search)]
      .reduce((acc, cur) => ({ ...acc, [cur[0]]: cur[1] }), {}));
  }, [search]);

  const setQueryParams = (values) => {
    if (!values) {
      return;
    }

    const query = new URLSearchParams(search);

    Object.keys(values).forEach((key) => {
      query.set(key, values[key]);
    });

    history.push({ search: query.toString() });
  };

  return [params, setQueryParams];
};

export default useQueryParams;
