import React, { Fragment } from 'react';
import AppLayout from '@/components/AppLayout';
import CommonInfo from './CommonInfo';
import SearchForm from './SearchForm';
import UserAttributes from './UserAttributes';
import UserSegments from './UserSegments';

const SegmentsUser = function SegmentsUser() {
  const user = '';
  const userAttributes = [];
  const userSegments = [];

  const handleSearchFormSubmit = (userName) => {
    console.log('Search Form Submit', userName);
  };

  return (
    <AppLayout headerTitle="Портрет пользователя">
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
          <h2>
            Атрибуты пользователя
          </h2>
          <UserAttributes
            data={userAttributes}
          />
          <h2>
            Сегменты, в которые входит пользователь
          </h2>
          <UserSegments
            data={userSegments}
          />
        </Fragment>
      )}
    </AppLayout>
  );
};

export default SegmentsUser;
