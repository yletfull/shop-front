
import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import LoginPage from '../Login';
import Header from './Header';
import Main from './Main';


const Upload = function UploadScreen() {
  const [authorized] = useState(false);

  return (
    authorized
      ? (
        <AppLayout headerTitle="Вконтакт">
          <Header />
          <Main />
        </AppLayout>
      )
      : <LoginPage />
  );
};

export default Upload;
