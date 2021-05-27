import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { injectReducer } from '@/store';
import { setHeader } from '@/store/ui/actions';
import Button from '@/components/Button';
import { namespace as NS } from './constants';
import reducer from './reducer';
import {
  fetchParams,
} from './actions';
import {
  getIsFetchingParams,
  getParams,
} from './selectors';
import Params from './Params';
import ParamsForm from './ParamsForm';
import styles from './styles.module.scss';

const propTypes = {
  defaultTitle: PropTypes.string,
};

const defaultProps = {
  defaultTitle: '',
};

const SegmentsEdit = function SegmentsEdit({ defaultTitle }) {
  const dispatch = useDispatch();

  const { id: segmentId } = useParams();

  const isFetchingParams = useSelector(getIsFetchingParams);
  const params = useSelector(getParams);

  const [isShowParams, setIsShowParams] = useState(false);

  const isNewSegment = typeof segmentId === 'undefined';

  useEffect(() => {
    injectReducer(NS, reducer);
  }, []);

  useEffect(() => {
    dispatch(fetchParams());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setHeader(isNewSegment
      ? 'Новый сегмент'
      : `${defaultTitle} #${segmentId}`));
  }, [dispatch, defaultTitle, isNewSegment, segmentId]);

  const handleCloseParamsModal = () => {
    setIsShowParams(false);
  };
  const handleClickShowParams = () => {
    if (isShowParams) {
      return;
    }
    setIsShowParams(true);
  };
  const handleSubmitParams = (values) => {
    console.log(values);
  };

  return (
    <div className={styles.wrapper}>
      <Params
        isFetching={isFetchingParams}
        isVisible={isShowParams}
        form={(
          <ParamsForm
            data={params}
            onSubmit={handleSubmitParams}
          />
        )}
        onCloseModal={handleCloseParamsModal}
      >
        <Button
          type="button"
          onClick={handleClickShowParams}
        >
          + ещё параметр
        </Button>
      </Params>
    </div>
  );
};

SegmentsEdit.propTypes = propTypes;
SegmentsEdit.defaultProps = defaultProps;

export default SegmentsEdit;
