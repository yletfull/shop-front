import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { injectReducer } from '@/store';
import { setHeader } from '@/store/ui/actions';
import IconPlus from '@/icons/Plus';
import IconSearch from '@/icons/Search';
import { namespace as NS } from './constants';
import reducer from './reducer';
import { fetchSegments } from './actions';
import { getIsFetchingData, getData } from './selectors';
import Controls from './Controls';
import ControlsLink from './ControlsLink';
import TableView from './TableView';
import styles from './styles.module.scss';

const propTypes = {
  defaultTitle: PropTypes.string,
};

const defaultProps = {
  defaultTitle: '',
};

const SegmentsList = function SegmentsList({ defaultTitle }) {
  const dispatch = useDispatch();

  const isFetching = useSelector(getIsFetchingData);
  const tableData = useSelector(getData);

  useEffect(() => {
    injectReducer(NS, reducer);
  }, []);

  useEffect(() => {
    dispatch(setHeader(defaultTitle));
  }, [dispatch, defaultTitle]);

  useEffect(() => {
    dispatch(fetchSegments());
  }, [dispatch]);

  return (
    <div className={styles.segmentsList}>
      <Controls>
        <ControlsLink
          icon={(<IconPlus />)}
          to="/segments/edit"
        >
          Новый сегмент
        </ControlsLink>
        <ControlsLink
          icon={(<IconSearch />)}
          to="/"
        >
          Найти пользователя
        </ControlsLink>
      </Controls>

      <TableView
        isFetching={isFetching}
        data={tableData}
      />
    </div>
  );
};

SegmentsList.propTypes = propTypes;
SegmentsList.defaultProps = defaultProps;

export default SegmentsList;
