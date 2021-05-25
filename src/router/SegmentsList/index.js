import React from 'react';
import IconPlus from '@/icons/Plus';
import IconSearch from '@/icons/Search';
import Controls from './Controls';
import ControlsLink from './ControlsLink';
import TableView from './TableView';
import styles from './styles.module.scss';

const SegmentsList = function SegmentsList() {
  const tableData = [];
  return (
    <div className={styles.segmentsList}>
      <Controls>
        <ControlsLink
          icon={(<IconPlus />)}
          to="/"
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
        data={tableData}
      />
    </div>
  );
};

export default SegmentsList;
