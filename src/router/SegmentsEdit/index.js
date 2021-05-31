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
  fetchSegment,
  addSegmentParam,
} from './actions';
import {
  getIsFetchingParams,
  getIsFetchingSegment,
  getParams,
  getSegment,
} from './selectors';
import Attribute from './Attribute';
import AttributesGroup from './AttributesGroup';
import Constructor from './Constructor';
import Params from './Params';
import ParamsForm from './ParamsForm';
import Statistics from './Statistics';
import styles from './styles.module.scss';

const propTypes = {
  defaultTitle: PropTypes.string,
};

const defaultProps = {
  defaultTitle: '',
};

const SegmentsEdit = function SegmentsEdit({ defaultTitle }) {
  const generateKeyByIndex = (key, index) => `${key}-${index}`;

  const dispatch = useDispatch();

  const { id: segmentId } = useParams();

  const isFetchingParams = useSelector(getIsFetchingParams);
  const params = useSelector(getParams);

  const isFetchingSegment = useSelector(getIsFetchingSegment);
  const segmentStructure = useSelector(getSegment);

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

    if (!isNewSegment) {
      dispatch(fetchSegment(segmentId));
    }
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
  const handleSubmitParams = ({ params: selectedParams }) => {
    if (!selectedParams) {
      return;
    }
    dispatch(addSegmentParam(selectedParams));
  };

  const statistic = {};

  return (
    <div className={styles.wrapper}>
      <Constructor isFetching={isFetchingSegment}>
        {segmentStructure
          && Array.isArray(segmentStructure)
          && segmentStructure.map((group, index) => {
            const groupKey = generateKeyByIndex('group', index);
            return (
              <AttributesGroup key={groupKey}>
                {group.map((attribute) => (
                  <Attribute
                    key={`${groupKey}-${attribute.attributeName}`}
                    title={attribute.title}
                    type={attribute.type}
                    data={attribute}
                  />
                ))}
              </AttributesGroup>
            );
          })}
      </Constructor>

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

      <h2>
        Выборка
      </h2>

      <Statistics
        emailsCount={statistic.emails}
        phonesCount={statistic.phones}
      />

      <Button>
        Сохранить сегмент
      </Button>
    </div>
  );
};

SegmentsEdit.propTypes = propTypes;
SegmentsEdit.defaultProps = defaultProps;

export default SegmentsEdit;
