import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import service from '@/features/Audiences/service';
import { useQueryParams, useService } from '@/hooks';
import AppMain from '@/components/AppMain';
import Spinner from '@/components/Spinner';
import CommonInfo from '@/features/Audiences/components/CommonInfo';
import CommonInfoCard from '@/features/Audiences/components/CommonInfoCard';
import ComparisonTable from '@/features/Audiences/components/ComparisonTable';
import { entityTypes, mapEntityTypes } from '@/features/Audiences/constants';
import styles from './styles.module.scss';

const AudiencesDetails = function AudiencesDetails() {
  const { id: audienceId } = useParams();
  const [params, setParams] = useQueryParams();
  const [pageTitle, setPageTitle] = useState('Аудитория');

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
    const { title } = details || {};
    if (title) {
      setPageTitle(`Аудитория «${title}»`);
    }
  }, [details]);

  useEffect(() => {
    if (!audienceId) {
      return;
    }
    fetchDetails(audienceId);
  }, [fetchDetails, audienceId]);

  useEffect(() => {
    if (!audienceId) {
      return;
    }
    fetchCompare({ id: audienceId, params });
  }, [fetchCompare, audienceId, params]);

  const totalEntities = useMemo(() => {
    const initialTotal = { emails: 0, phones: 0 };
    const { entityTypeTotals } = details || {};
    if (!entityTypeTotals || !Array.isArray(entityTypeTotals)) {
      return initialTotal;
    }
    const mapEntityTypeKey = {
      [entityTypes.phones]: 'phones',
      [entityTypes.emails]: 'emails',
    };
    return entityTypeTotals
      .reduce((acc, { entityType, total }) => ({
        ...acc,
        [mapEntityTypeKey[entityType]]: total,
      }), initialTotal);
  }, [details]);

  const audienceCompare = useMemo(() => Object.keys(compare)
    .map((key) => compare[key]
      .map((d, i) => {
        const generateKey = (name, index) => `${name}-${index}`;
        const result = [];
        const { comparedEntityTypes, name, total } = d || {};

        if (total && Object.keys(total).length > 0) {
          result.push({
            name,
            key: generateKey(`${key}-${name}-total`, i),
            isTotal: true,
            ...total,
          });
        }

        if (comparedEntityTypes && Array.isArray(comparedEntityTypes)) {
          result.push(comparedEntityTypes
            .map((entity, index) => {
              const { entityType, value } = entity || {};
              return ({
                key: generateKey(`${key}-${name}-${entityType}-${i}`, index),
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
            <CommonInfo data={details}>
              <CommonInfoCard
                label="Телефоны"
                count={totalEntities.phones || 0}
              />
              <CommonInfoCard
                label="E-mail"
                count={totalEntities.emails || 0}
              />
            </CommonInfo>

            <h2 className={styles.audienceDetailsHeader}>
              Сравнение с глобальной аудиторией
            </h2>

            <ComparisonTable
              isFetching={isFetchingCompare}
              data={audienceCompare}
              name={details?.title || ''}
              onFilter={setParams}
            />
          </Fragment>
        )}
      </div>
    </AppMain>
  );
};

export default AudiencesDetails;
