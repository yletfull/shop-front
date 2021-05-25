import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setHeader } from '@/store/ui/actions';
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

  const isNewSegment = typeof segmentId === 'undefined';

  useEffect(() => {
    dispatch(setHeader(isNewSegment
      ? 'Новый сегмент'
      : `${defaultTitle} #${segmentId}`));
  }, [dispatch, defaultTitle, isNewSegment, segmentId]);

  return (
    <div className={styles.wrapper}>
      SegmentsEdit
    </div>
  );
};

SegmentsEdit.propTypes = propTypes;
SegmentsEdit.defaultProps = defaultProps;

export default SegmentsEdit;
