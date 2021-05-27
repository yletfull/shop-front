import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setHeader } from '@/store/ui/actions';
import styles from './styles.module.scss';

const propTypes = {
  defaultTitle: PropTypes.string,
};

const defaultProps = {
  defaultTitle: '',
};

const AudiencesList = function AudiencesList({ defaultTitle }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeader(defaultTitle));
  }, [dispatch, defaultTitle]);

  return (
    <div className={styles.audienceList}>
      AudiencesList
    </div>
  );
};

AudiencesList.propTypes = propTypes;
AudiencesList.defaultProps = defaultProps;

export default AudiencesList;
