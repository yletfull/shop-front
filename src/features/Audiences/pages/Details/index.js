import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import service from '@/features/Audiences/service';
import { useQuery, useService } from '@/hooks';
import AppMain from '@/components/AppMain';
import Spinner from '@/components/Spinner';
import CommonInfo from '@/features/Audiences/components/CommonInfo';
import CommonInfoCard from '@/features/Audiences/components/CommonInfoCard';
import ComparisonTable from '@/features/Audiences/components/ComparisonTable';
import {
  entityTypes,
  queryParams,
  mapEntityTypes,
  mapQueryParams,
} from './constants';
import styles from './styles.module.scss';

const AudiencesDetails = function AudiencesDetails() {
  const history = useHistory();
  const query = useQuery();

  const { id: audienceId } = useParams();

  const {
    fetch: fetchDetails,
    data: details,
    isFetching: isFetchingDetails,
  } = useService({
    initialData: {},
    service: service.fetchAudienceDetails,
  });

  const {
    fetch: fetchCompare,
    data: compare,
    isFetching: isFetchingCompare,
  } = useService({
    initialData: {},
    service: service.fetchAudienceCompare,
  });

  useEffect(() => {
    fetchDetails(audienceId);
  }, [fetchDetails, audienceId]);

  const audienceDetails = useMemo(() => {
    const { entityTypeTotals } = details || {};
    if (!entityTypeTotals || !Array.isArray(entityTypeTotals)) {
      return details;
    }
    const mapEntityTypeKey = {
      [entityTypes.phones]: 'phones',
      [entityTypes.emails]: 'emails',
    };
    const { emails, phones } = entityTypeTotals
      .reduce((acc, { entityType, total }) => ({
        ...acc,
        [mapEntityTypeKey[entityType]]: total,
      }), {});
    return ({
      emailEntities: emails || 0,
      phoneEntities: phones || 0,
      ...details,
    });
  }, [details]);

  const audienceCompare = useMemo(() => Object.keys(compare)
    .map((key) => compare[key]
      .map((d) => {
        const result = [];
        const { comparedEntityTypes, name, total } = d || {};

        if (total && Object.keys(total).length > 0) {
          result.push({
            name,
            key: `${key}-total`,
            isTotal: true,
            ...total,
          });
        }

        if (comparedEntityTypes && Array.isArray(comparedEntityTypes)) {
          result.push(comparedEntityTypes
            .map((entity) => {
              const { entityType, value } = entity || {};
              return ({
                key: `${key}-${entityType}`,
                isTotal: false,
                name: mapEntityTypes[entityType] || '',
                ...value,
              });
            }));
        }

        return result
          .reduce((acc, cur) => {
            if (Array.isArray(cur)) {
              return ([...acc, ...cur]);
            }
            return ([...acc, cur]);
          }, []);
      })
      .reduce((acc, cur) => ([...acc, ...cur]), []))
    .reduce((acc, cur) => ([...acc, ...cur]), []), [compare]);

  const [compareFilter, setCompareFilter] = useState({
    [mapQueryParams[queryParams.search]]: query.get(queryParams.search) || '',
  });
  const [pageTitle, setPageTitle] = useState();

  useEffect(() => {
    const { title } = audienceDetails || {};
    if (title) {
      setPageTitle(`Аудитория «${title}»`);
    }
  }, [audienceDetails]);

  useEffect(() => {
    fetchCompare(audienceId, compareFilter);
  }, [fetchCompare, audienceId, compareFilter]);

  const handleFilterComparisonTable = (values) => {
    const { [mapQueryParams[queryParams.search]]: search } = values || {};
    query.set(queryParams.search, search);
    setCompareFilter({ [mapQueryParams[queryParams.search]]: search || '' });
    history.push({ search: query.toString() });
  };

  return (
    <AppMain
      header={(
        <div className={styles.header_title}>
          {pageTitle}
        </div>
      )}
    >
      <div className={styles.audienceDetails}>
        {isFetchingDetails && (
          <Spinner />
        )}

        {!isFetchingDetails && (
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
              isFetching={isFetchingCompare}
              data={audienceCompare}
              name={audienceDetails?.title || ''}
              onFilter={handleFilterComparisonTable}
            />
          </Fragment>
        )}
      </div>
    </AppMain>
  );
};

export default AudiencesDetails;
