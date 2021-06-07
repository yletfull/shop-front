import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { injectReducer } from '@/store';
import { setHeader } from '@/store/ui/actions';
import Spinner from '@/components/Spinner';
import { namespace as NS } from './constants';
import reducer from './reducer';
import { getIsFetchingData, getData } from './selectors';
import CommonInfo from './CommonInfo';
import Comparison from './Comparison';
import styles from './styles.module.scss';

const propTypes = {
  defaultTitle: PropTypes.string,
};

const defaultProps = {
  defaultTitle: '',
};

const AudiencesDetails = function AudiencesDetails({ defaultTitle }) {
  const dispatch = useDispatch();

  const isFetching = useSelector(getIsFetchingData);
  const data = useSelector(getData);

  useEffect(() => {
    injectReducer(NS, reducer);
  }, []);

  useEffect(() => {
    dispatch(setHeader(defaultTitle));
  }, [dispatch, defaultTitle]);

  return (
    <div className={styles.audienceDetails}>
      {isFetching && (
        <Spinner />
      )}

      {!isFetching && (
        <Fragment>
          <CommonInfo data={data} />

          <h2>
            Сравнение с глобальной аудиторией
          </h2>

          <Comparison data={data} />
        </Fragment>
      )}
    </div>
  );
};

AudiencesDetails.propTypes = propTypes;
AudiencesDetails.defaultProps = defaultProps;

export default AudiencesDetails;
