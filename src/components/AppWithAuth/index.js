import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import api from '@/api';
import { authCheck, authLogout } from '@/store/auth/actions';
import { getIsAuthorized, getIsFetching } from '@/store/auth/selectors';
import LoginPage from '@/components/Login';
import Spinner from '@/components/Spinner';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {
  children: null,
};

const WithAuth = function WithAuth({ children }) {
  const dispatch = useDispatch();
  const isAuthorized = useSelector(getIsAuthorized);
  const isFetching = useSelector(getIsFetching);

  useEffect(() => {
    dispatch(authCheck());

    const logoutInterceptor = api.interceptors.response.use(null, (error) => {
      if (error?.response?.status === 401) {
        dispatch(authLogout());
      }

      return Promise.reject(error);
    });

    return () => {
      api.interceptors.response.eject(logoutInterceptor);
    };
  }, [dispatch]);

  if (isFetching) {
    return (
      <Spinner />
    );
  }

  if (!isAuthorized) {
    return (
      <LoginPage />
    );
  }

  return children;
};

WithAuth.propTypes = propTypes;
WithAuth.defaultProps = defaultProps;

export default WithAuth;