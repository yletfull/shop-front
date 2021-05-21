
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
        <React.Fragment headerTitle="Вконтакт">
          <Header />
          <Main />
        </React.Fragment>
      )
      : <LoginPage />
  );
};

export default Upload;
