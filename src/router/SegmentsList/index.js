import React from 'react';
import AppLayout from '@/components/AppLayout';
import Controls from './Controls';
import ControlsLink from './ControlsLink';
import TableView from './TableView';

const SegmentsList = function SegmentsList() {
  const tableData = [];
  return (
    <AppLayout headerTitle="Сегменты и выгрузки">
      <Controls>
        <ControlsLink
          to="/"
          type="create"
        >
          Новый сегмент
        </ControlsLink>
        <ControlsLink
          to="/"
          type="search"
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
