/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '@/components/Spinner';
import { authCheck } from '@/store/auth/actions';
import AppLayout from '@/components/AppLayout';
import LoginPage from '../Login';

const propTypes = {
  Component: PropTypes.element.isRequired,
  props: PropTypes.any,
};

const defaultProps = {
  props: '',
};

const Auth = function AuthMiddleware({ Component, props }) {
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
          <Component {...props} />
        </AppLayout>
      )
      : <LoginPage />
  );
};

Auth.propTypes = propTypes;
Auth.defaultProps = defaultProps;

export default Auth;
