import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setHeader } from '@/store/ui/actions';
import Header from './Header';
import Main from './Main';

const propTypes = {
  defaultTitle: PropTypes.string,
};

const defaultProps = {
  defaultTitle: '',
};

const Upload = function UploadScreen({ defaultTitle }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeader(defaultTitle));
  }, [dispatch, defaultTitle]);

  return (
    <Fragment>
      <Header />
      <Main />
    </Fragment>
  );
};

Upload.propTypes = propTypes;
Upload.defaultProps = defaultProps;

export default Upload;
