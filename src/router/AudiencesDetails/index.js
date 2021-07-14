import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { injectReducer } from '@/store';
import { setHeader } from '@/store/ui/actions';
import Spinner from '@/components/Spinner';
import { namespace as NS } from './constants';
import reducer from './reducer';
import {
  fetchAudienceDetails,
} from './actions';
import {
  getIsFetchingAudienceDetails,
  getAudienceDetails,
} from './selectors';
import CommonInfo from './CommonInfo';
import CommonInfoCard from './CommonInfoCard';
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

  const { id: audienceId } = useParams();

  const isFetchingAudienceDetails = useSelector(getIsFetchingAudienceDetails);
  const audienceDetails = useSelector(getAudienceDetails);

  useEffect(() => {
    injectReducer(NS, reducer);
  }, []);

  useEffect(() => {
    dispatch(setHeader(defaultTitle));
  }, [dispatch, defaultTitle]);

  useEffect(() => {
    dispatch(fetchAudienceDetails(audienceId));
  }, [dispatch, audienceId]);

  return (
    <div className={styles.audienceDetails}>
      {isFetchingAudienceDetails && (
        <Spinner />
      )}

      {!isFetchingAudienceDetails && (
        <Fragment>
          <CommonInfo data={audienceDetails}>
            <CommonInfoCard
              label="Телефоны"
              count={audienceDetails.phones}
            />
            <CommonInfoCard
              label="E-mail"
              count={audienceDetails.emails}
            />
          </CommonInfo>

          <h2>
            Сравнение с глобальной аудиторией
          </h2>

          <Comparison data={audienceDetails} />
        </Fragment>
      )}
    </div>
  );
};

AudiencesDetails.propTypes = propTypes;
AudiencesDetails.defaultProps = defaultProps;

export default AudiencesDetails;
