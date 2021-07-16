import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { injectReducer } from '@/store';
import { setHeader } from '@/store/ui/actions';
import { useQuery } from '@/hooks';
import Spinner from '@/components/Spinner';
import {
  queryParams,
  mapQueryParams,
  namespace as NS,
} from './constants';
import reducer from './reducer';
import {
  fetchAudienceCompare,
  fetchAudienceDetails,
} from './actions';
import {
  getIsFetchingAudienceCompare,
  getIsFetchingAudienceDetails,
  getFormattedAudienceCompare,
  getFormattedAudienceDetails,
} from './selectors';
import CommonInfo from './CommonInfo';
import CommonInfoCard from './CommonInfoCard';
import ComparisonTable from './ComparisonTable';
import styles from './styles.module.scss';

const propTypes = {
  defaultTitle: PropTypes.string,
};

const defaultProps = {
  defaultTitle: '',
};

const AudiencesDetails = function AudiencesDetails({ defaultTitle }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();

  const { id: audienceId } = useParams();

  const isFetchingAudienceCompare = useSelector(getIsFetchingAudienceCompare);
  const isFetchingAudienceDetails = useSelector(getIsFetchingAudienceDetails);
  const audienceCompare = useSelector(getFormattedAudienceCompare);
  const audienceDetails = useSelector(getFormattedAudienceDetails);

  const [compareFilter, setCompareFilter] = useState({
    [mapQueryParams[queryParams.search]]: query.get(queryParams.search) || '',
  });
  const [pageTitle, setPageTitle] = useState(defaultTitle || '');

  useEffect(() => {
    injectReducer(NS, reducer);
  }, []);

  useEffect(() => {
    const { title } = audienceDetails || {};
    if (title) {
      setPageTitle(`Аудитория «${title}»`);
    }
  }, [audienceDetails]);

  useEffect(() => {
    dispatch(setHeader(pageTitle));
    return () => dispatch(setHeader(''));
  }, [dispatch, pageTitle]);

  useEffect(() => {
    dispatch(fetchAudienceDetails(audienceId));
  }, [dispatch, audienceId]);

  useEffect(() => {
    dispatch(fetchAudienceCompare(audienceId, compareFilter));
  }, [dispatch, audienceId, compareFilter]);

  const handleFilterComparisonTable = (values) => {
    const { [mapQueryParams[queryParams.search]]: search } = values || {};
    query.set(queryParams.search, search);
    setCompareFilter({ [mapQueryParams[queryParams.search]]: search || '' });
    history.push({ search: query.toString() });
  };

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
              count={audienceDetails.phoneEntities || 0}
            />
            <CommonInfoCard
              label="E-mail"
              count={audienceDetails.emailEntities || 0}
            />
          </CommonInfo>

          <h2 className={styles.audienceDetailsHeader}>
            Сравнение с глобальной аудиторией
          </h2>

          <ComparisonTable
            isFetching={isFetchingAudienceCompare}
            data={audienceCompare}
            name={audienceDetails?.title || ''}
            onFilter={handleFilterComparisonTable}
          />
        </Fragment>
      )}
    </div>
  );
};

AudiencesDetails.propTypes = propTypes;
AudiencesDetails.defaultProps = defaultProps;

export default AudiencesDetails;
