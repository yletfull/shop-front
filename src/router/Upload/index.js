
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@/components/AppLayout';
import Spinner from '@/components/Spinner';
import LoginPage from '../Login';
import { authCheck } from '../../store/auth/actions';
import Header from './Header';
import Main from './Main';


const Upload = function UploadScreen() {
  const dispatch = useDispatch();

  const authorized = useSelector((store) => store.auth.user);
  const isFetching = useSelector((store) => store.auth.isFetching);


  useEffect(() => {
    dispatch(authCheck());
  }, [dispatch]);

  if (isFetching) {
    return <Spinner />;
  }

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
