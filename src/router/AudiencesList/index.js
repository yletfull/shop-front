import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { injectReducer } from '@/store';
import { setHeader } from '@/store/ui/actions';
import { namespace as NS } from './constants';
import reducer from './reducer';
import {
  fetchAudiencesList,
} from './actions';
import {
  getFormattedAudienceList,
  getIsFetchingAudiencesList,
} from './selectors';
import TableView from './TableView';
import styles from './styles.module.scss';

const propTypes = {
  defaultTitle: PropTypes.string,
};

const defaultProps = {
  defaultTitle: '',
};

const AudiencesList = function AudiencesList({ defaultTitle }) {
  const dispatch = useDispatch();

  const isFetching = useSelector(getIsFetchingAudiencesList);
  const tableData = useSelector(getFormattedAudienceList);

  useEffect(() => {
    injectReducer(NS, reducer);
  }, []);

  useEffect(() => {
    dispatch(fetchAudiencesList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setHeader(defaultTitle));
  }, [dispatch, defaultTitle]);

  return (
    <div className={styles.audienceList}>
      <TableView
        data={tableData}
        isFetching={isFetching}
      />
    </div>
  );
};

AudiencesList.propTypes = propTypes;
AudiencesList.defaultProps = defaultProps;

export default AudiencesList;
