
import React from 'react';
import { useSelector } from 'react-redux';
import AppLayout from '@/components/AppLayout';
import LoginPage from '../Login';
import Header from './Header';
import Main from './Main';


const Upload = function UploadScreen() {
  const authorized = useSelector((store) => store.auth.user);

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
