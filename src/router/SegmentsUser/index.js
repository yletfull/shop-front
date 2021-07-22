import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setHeader } from '@/store/ui/actions';
import CommonInfo from './CommonInfo';
import SearchForm from './SearchForm';
import UserAttributes from './UserAttributes';
import UserSegments from './UserSegments';
import styles from './styles.module.scss';

const propTypes = {
  defaultTitle: PropTypes.string,
};

const defaultProps = {
  defaultTitle: '',
};

const SegmentsUser = function SegmentsUser({ defaultTitle }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeader(defaultTitle));
  }, [dispatch, defaultTitle]);

  const user = '';
  const userAttributes = [];
  const userSegments = [];

  const handleSearchFormSubmit = (userName) => {
    console.log('Search Form Submit', userName);
  };

  return (
    <div className={styles.segmentsUser}>
      <SearchForm
        user={user}
        onSubmit={handleSearchFormSubmit}
      />
      {!user && (
        <Fragment>
          <CommonInfo
            segmentsCount={0}
            uploadsCount={0}
            lastUpdateDate=""
            lastUptateIdentifier=""
          />

          <h2 className={styles.heading}>
            Атрибуты пользователя
          </h2>

          <UserAttributes
            data={userAttributes}
          />

          <h2 className={styles.heading}>
            Сегменты, в которые входит пользователь
          </h2>

          <UserSegments
            data={userSegments}
          />
        </Fragment>
      )}
    </div>
  );
};

SegmentsUser.propTypes = propTypes;
SegmentsUser.defaultProps = defaultProps;

export default SegmentsUser;
