import React from 'react';
import IconArrowChart from '@/icons/ArrowChart';
import IconRocket from '@/icons/Rocket';
import IconThumbsUp from '@/icons/ThumbsUp';
import IconThumbsDown from '@/icons/ThumbsDown';
import IconRetweetAlt from '@/icons/RetweetAlt';
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
        <IconArrowChart />
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
        <IconArrowChart />
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
        <IconArrowChart />
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        <IconThumbsUp />
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        <IconArrowChart />
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        <IconThumbsDown />
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        <IconArrowChart />
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        <IconRetweetAlt />
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        <IconArrowChart />
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        Всего
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        <IconArrowChart />
      </TableCell>
    </TableRow>
  );
};

export default StatisticsHeader;
