import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useService } from '@/hooks';
import WithSpinner from '../components/WithSpinner';
import ErrorMessage from '../components/ErrorMessage';
import service from '../service';
import Chart from './Chart';
import styles from './styles.module.scss';

const propTypes = {
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
};

const defaultProps = {};

const ReactionsComments = function ReactionsComments({
  dateStart,
  dateEnd,
}) {
  const { entityType, id: entityId } = useParams();

  const { fetch, data: response, isFetching, error } = useService({
    initialData: {},
    service: service.fetchReactionsComments,
  });

  useEffect(() => {
    if (!dateStart || !dateEnd) {
      return;
    }
    fetch(
      {
        entityType,
        entityId,
        params: { dateStart, dateEnd },
      }
    );
  }, [fetch, dateStart, dateEnd, entityType, entityId]);

  const data = Object.keys(response?.data || {})
    .map((key) => response.data[key]);

  console.log({ data });

  return (
    <div className={styles.wrapper}>
      <WithSpinner
        layout="overlay"
        isFetching={isFetching}
        className={styles.spinnerOverlay}
      />
      {error && (
        <ErrorMessage
          error={error}
        />
      )}
      <Chart />
    </div>
  );
};

ReactionsComments.propTypes = propTypes;
ReactionsComments.defaultProps = defaultProps;

export default ReactionsComments;
