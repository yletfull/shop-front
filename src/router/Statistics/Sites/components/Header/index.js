import React from 'react';
import IconArrowChart from '@/icons/ArrowChart';
import IconRocket from '@/icons/Rocket';
import IconCaretDown from '@/icons/CaretDown';
import { TableRow, TableCell } from '@/components/Table';
import styles from './styles.module.scss';

const StatisticsHeader = function StatisticsTaskScreen() {
  return (
    <TableRow
      type="header"
    >
      <TableCell width="1" />
      <TableCell>
        Название
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        <IconRocket />
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        <button
          type="button"
          className={styles.screenings}
        >
          Показы
          <IconCaretDown
            className={styles.screenings_icon}
          />
        </button>
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        <IconArrowChart className={styles.chart} />
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        Клики
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        <IconArrowChart className={styles.chart} />
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        CTR
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        <IconArrowChart className={styles.chart} />
      </TableCell>
    </TableRow>
  );
};

export default StatisticsHeader;
