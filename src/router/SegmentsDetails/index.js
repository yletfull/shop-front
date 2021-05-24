import React from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '@/components/AppLayout';
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

const SegmentsDetails = function SegmentsDetails() {
  const { id: segmentId } = useParams();
  const data = {};
  const meta = [];
  return (
    <AppLayout headerTitle={`Сегмент #${segmentId}`}>
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

    </AppLayout>
  );
};

export default SegmentsDetails;
