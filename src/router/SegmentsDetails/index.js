import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setHeader } from '@/store/ui/actions';
import IconPencil from '@/icons/Pencil';
import IconSync from '@/icons/Sync';
import IconTrash from '@/icons/Trash';
import Controls from './Controls';
import ControlsButton from './ControlsButton';
import ControlsLink from './ControlsLink';
import SegmentInfo from './SegmentInfo';
import SegmentAudience from './SegmentAudience';
import SegmentVersions from './SegmentVersions';
import styles from './styles.module.scss';

const propTypes = {
  defaultTitle: PropTypes.string,
};

const defaultProps = {
  defaultTitle: '',
};

const SegmentsDetails = function SegmentsDetails({ defaultTitle }) {
  const dispatch = useDispatch();

  const { id: segmentId } = useParams();

  useEffect(() => {
    dispatch(setHeader(`${defaultTitle} #${segmentId}`));
  }, [dispatch, defaultTitle, segmentId]);

  const data = {};
  const meta = [];
  return (
    <div className={styles.segmentsDetails}>
      <Controls>
        <ControlsLink
          to="/"
          icon={(<IconPencil />)}
        >
          Изменить сегмент
        </ControlsLink>
        <ControlsButton
          icon={(<IconSync />)}
          disabled
        >
          Пересчитать
        </ControlsButton>
        <ControlsButton
          icon={(<IconTrash />)}
          disabled
        >
          В архив
        </ControlsButton>
      </Controls>

      <SegmentInfo
        data={data}
      />

      <h2 className={styles.heading}>
        Аудитория
      </h2>

      <SegmentAudience
        data={data}
      />

      <h2 className={styles.heading}>
        Версии сегмента и файлы для площадок
      </h2>

      <SegmentVersions
        data={meta}
      />
    </div>
  );
};

SegmentsDetails.propTypes = propTypes;
SegmentsDetails.defaultProps = defaultProps;

export default SegmentsDetails;
