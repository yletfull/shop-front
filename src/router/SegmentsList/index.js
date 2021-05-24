import React from 'react';
import AppLayout from '@/components/AppLayout';
import IconPlus from '@/icons/Plus';
import IconSearch from '@/icons/Search';
import Controls from './Controls';
import ControlsLink from './ControlsLink';
import TableView from './TableView';

const SegmentsList = function SegmentsList() {
  const tableData = [];
  return (
    <AppLayout headerTitle="Сегменты и выгрузки">
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
    </AppLayout>
  );
};

export default SegmentsList;
