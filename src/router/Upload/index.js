import React from 'react';
import AppMain from '@/components/AppMain';
import PageHeader from '@/components/PageHeader';
import Header from './Header';
import Main from './Main';

const propTypes = {};
const defaultProps = {};

const Upload = function UploadScreen() {
  return (
    <AppMain
      header={(
        <PageHeader>
          Вконтакт
        </PageHeader>
      )}
    >
      <Header />
      <Main />
    </AppMain>
  );
};

Upload.propTypes = propTypes;
Upload.defaultProps = defaultProps;

export default Upload;
