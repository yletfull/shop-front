import React, { Fragment } from 'react';
import CommonInfo from './CommonInfo';
import SearchForm from './SearchForm';
import UserAttributes from './UserAttributes';
import UserSegments from './UserSegments';
import styles from './styles.module.scss';

const SegmentsUser = function SegmentsUser() {
  const user = '';
  const userAttributes = [];
  const userSegments = [];

  const handleSearchFormSubmit = (userName) => {
    console.log('Search Form Submit', userName);
  };

  return (
    <div className={styles.segmentsUser}>
      <SearchForm
        inputValue={user}
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

export default SegmentsUser;
