import React from 'react';
import AppLayout from '@/components/AppLayout';
import Button from '@/components/Button';
import TableView from './TableView';
import styles from './styles.module.scss';

const SegmentsList = function SegmentsList() {
  const tableData = [];
  return (
    <AppLayout headerTitle="Сегменты и выгрузки">
      <div className={styles.controls}>
        <Button
          appearance="control"
          className={styles.controlsAdd}
          disabled
        >
          Новый сегмент
        </Button>
        <Button
          appearance="control"
          className={styles.controlsFind}
          disabled
        >
          Найти пользователя
        </Button>
      </div>

      <TableView
        data={tableData}
      />
    </AppLayout>
  );
};

export default SegmentsList;
