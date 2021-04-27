
import React from 'react';
import AppLayout from '@/components/AppLayout';
import Header from './Header';
import Main from './Main';


const Upload = function UploadScreen() {
  return (
    <AppLayout headerTitle="Вконтакт">
      <Header />
      <Main />
    </AppLayout>
  );
};

export default Upload;
