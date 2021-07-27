import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
};

const defaultProps = {};

const withFetch = function withFetch(Component, request) {
  const WithFetch = function WithFetch({ dateStart, dateEnd, ...props }) {
    const [data, setData] = useState(null);
    const [meta, setMeta] = useState(null);
    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
      if (!dateStart || !dateEnd) {
        return;
      }
      const fetchData = async () => {
        setIsFetching(true);
        try {
          const response = await request({ dateStart, dateEnd });
          setData(response?.data || null);
          setMeta(response?.meta || null);
          setError(null);
        } catch (e) {
          setData(null);
          setMeta(null);
          setError(e);
        } finally {
          setIsFetching(false);
        }
      };
      fetchData();
    }, [dateStart, dateEnd]);

    return (
      <Component
        data={data}
        meta={meta}
        error={error}
        isFetching={isFetching}
        dateStart={dateStart}
        dateEnd={dateEnd}
        {...props}
      />
    );
  };

  WithFetch.propTypes = propTypes;
  WithFetch.defaultProps = defaultProps;

  return WithFetch;
};

export default withFetch;
