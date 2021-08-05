import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatDate } from '@/utils/format';
import { fetchUsers } from '@/store/users/actions';
import Button from '@/components/Button';
import { getUsersList } from '@/store/users/selectors';
import IconPlus from '@/icons/Plus';
import Table, { TableRow, TableCell } from '@/components/Table';
import WithSpinner from '@/components/WithSpinner';
import styles from './styles.module.scss';
import AddUserPopup from './AddUserPopup';

const userTable = function UsersScreen() {
  const dispatch = useDispatch();

  const [isFetching, setIsFetching] = useState(false);
  const [addUserPopupIsOpen, setAddUserPopupIsOpen] = useState(false);

  const users = useSelector(getUsersList);

  useEffect(() => {
    const fetchUsersFn = async () => {
      setIsFetching(true);
      await dispatch(fetchUsers());
      setIsFetching(false);
    };
    fetchUsersFn();
  }, [dispatch]);

  const handleAddUserOpenPopup = () => {
    setAddUserPopupIsOpen(true);
  };
  const handleAddUserClosePopup = () => {
    setAddUserPopupIsOpen(false);
  };

  return (
    <div>
      <div className={styles.headerWrapper}>
        <Button
          className={styles.editAbilitiesButton}
          appearance="control"
          onClick={handleAddUserOpenPopup}
        >
          <IconPlus />
          <span>
            Добавить пользователя
          </span>
        </Button>
      </div>
      <div className={styles.wrapper}>
        <WithSpinner
          className={styles.spinnerOverlay}
          layout="overlay"
          isFetching={isFetching}
        />
        <Table>
          <TableRow type="header">
            <TableCell>
              Идентификатор
            </TableCell>
            <TableCell>
              Логин
            </TableCell>
            <TableCell>
              e-mail
            </TableCell>
            <TableCell>
              Телефон
            </TableCell>
            <TableCell>
              Дата создания
            </TableCell>
            <TableCell>
              Дата обновления
            </TableCell>
          </TableRow>
          {users?.length
            ? users.map((user) => (
              <TableRow
                key={user.id}
                content=""
              >
                <TableCell>
                  <Link to={(location) => ({ location, pathname: `/users/list/${user.id}/details` })}>
                    {user.id || '-'}
                  </Link>
                </TableCell>
                <TableCell>
                  {user.login || '-'}
                </TableCell>
                <TableCell>
                  {user.email || '-'}
                </TableCell>
                <TableCell>
                  {user.phone || '-'}
                </TableCell>
                <TableCell>
                  {formatDate(user.createdAt, 'YYYY:MM:DD HH:mm:ss')}
                </TableCell>
                <TableCell>
                  {formatDate(user.uploadAt, 'YYYY:MM:DD HH:mm:ss')}
                </TableCell>
              </TableRow>
            ))
            : (
              <TableRow content="">
                <TableCell colSpan="8">
                  Пользователи не найдены
                </TableCell>
              </TableRow>
            )}
        </Table>
      </div>
      {addUserPopupIsOpen
        && <AddUserPopup onClose={handleAddUserClosePopup} />}

    </div>
  );
};

export default userTable;
