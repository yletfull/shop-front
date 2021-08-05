/* eslint-disable react/no-array-index-key */

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import cx from 'classnames';
import Spinner from '@/components/Spinner';
import { fetchUserDetails, fetchUserRoles, fetchAllRoles, setUserRoles, removeUserRole } from '@/store/users/actions';
import dayjs from '@/utils/day';
import Tag from '@/components/Tag';
import Button from '@/components/Button';
import Select from '@/components/Select';
import Table, { TableRow, TableCell } from '@/components/Table';
import TimesCircleIcon from '@/icons/TimesCircle';
import { getAllRoles, getUserRoles, getUserDetails, getUserSetRoleError } from '@/store/users/selectors';
import styles from './styles.module.scss';


const Details = function RolesDetailsScreen() {
  const dispatch = useDispatch();

  const [isFetching, setIsFetching] = useState(false);
  const [addRoleButtonDisabled, setAddRoleButtonDisabled] = useState(true);
  const [
    removeRoleButtonDisabled, setRemoveRoleButtonDisabled,
  ] = useState(false);
  const [selectedRole, setSelectedRole] = useState('default');

  const userDetails = useSelector(getUserDetails);
  const userRoles = useSelector(getUserRoles);
  const allRoles = useSelector(getAllRoles);

  const userDetailsErrorData = useSelector(
    (state) => state.users.userDetailsError
  );
  const userDetailsError = useRef(userDetailsErrorData);
  useLayoutEffect(() => {
    userDetailsError.current = userDetailsErrorData;
  }, [userDetailsErrorData]);

  const userSetRoleErrorData = useSelector(getUserSetRoleError);
  const userSetRoleError = useRef(userSetRoleErrorData);
  useLayoutEffect(() => {
    userSetRoleError.current = userSetRoleErrorData;
  }, [userSetRoleErrorData]);

  const { userId } = useParams();
  useEffect(() => {
    const fetchUsersFn = async () => {
      setIsFetching(true);
      await dispatch(fetchUserDetails({ userId }));
      await dispatch(fetchUserRoles({ userId }));
      await dispatch(fetchAllRoles());
      setIsFetching(false);
    };
    fetchUsersFn();
  }, [dispatch, userId]);

  useEffect(() => {
    if (selectedRole === 'default') {
      setAddRoleButtonDisabled(true);
      return;
    }
    setAddRoleButtonDisabled(false);
  }, [selectedRole]);

  const getAllRolesOptions = () => {
    if (allRoles?.length) {
      return allRoles.map((role) => ({
        text: role.title,
        value: role.name,
      }));
    }
    return [];
  };
  const handleRoleChange = (e) => {
    const { value } = e.target;
    setSelectedRole(value);
  };

  const handleSubmitRole = async (e) => {
    e.preventDefault();
    const roles = [];
    roles.push(selectedRole);
    if (userRoles.length) {
      roles.push(...userRoles.map((el) => el.name));
    }
    setAddRoleButtonDisabled(true);
    setRemoveRoleButtonDisabled(true);
    await dispatch(setUserRoles({ userId, ...roles }));
    await dispatch(fetchUserDetails({ userId }));
    await dispatch(fetchUserRoles({ userId }));
    setRemoveRoleButtonDisabled(false);
    setAddRoleButtonDisabled(false);
    setSelectedRole('');
  };

  const handleRemoveRoleButtonClick = async (e) => {
    const { rolename } = e.target.dataset;
    setAddRoleButtonDisabled(true);
    setRemoveRoleButtonDisabled(true);
    await dispatch(removeUserRole({ roleName: rolename, userId }));
    await dispatch(fetchUserDetails({ userId }));
    await dispatch(fetchUserRoles({ userId }));
    setRemoveRoleButtonDisabled(false);
    setAddRoleButtonDisabled(false);
  };

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <Table className={styles.table}>
      <TableRow>
        <TableCell
          className={styles.title}
        >
          Идентификатор
        </TableCell>
        <TableCell>
          {userDetails.id || '-'}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          className={styles.title}
        >
          Логин
        </TableCell>
        <TableCell>
          {userDetails.login || '-'}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          className={styles.title}
        >
          E-mail
        </TableCell>
        <TableCell>
          {userDetails.email || '-'}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          className={styles.title}
        >
          Телефон
        </TableCell>
        <TableCell>
          {userDetails.phone || '-'}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          className={styles.title}
        >
          Создан
        </TableCell>
        <TableCell>
          {dayjs(userDetails.createdAt).format('YYYY:MM:DD HH:mm:ss')}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          className={styles.title}
        >
          Обновлен
        </TableCell>
        <TableCell>
          {dayjs(userDetails.uploadAt).format('YYYY:MM:DD HH:mm:ss')}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          className={styles.title}
        >
          Роли:
        </TableCell>
        <TableCell>
          <div className={styles.tagsWrapper}>
            {userRoles?.length
              ? userRoles.map((role, ind) => (
                <div
                  className={styles.roleItem}
                  key={ind}
                >
                  <Tag text={role.title} />
                  <Button
                    appearance="control"
                    className={styles.removeRoleButton}
                    onClick={handleRemoveRoleButtonClick}
                    data-rolename={role.name}
                    disabled={removeRoleButtonDisabled}
                  >
                    <TimesCircleIcon />
                  </Button>
                </div>
              ))
              : (
                <span>
                  -
                </span>
              )}
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          className={styles.title}
        >
          Добавить роль
        </TableCell>
        <TableCell>
          <form
            className={styles.addRoleForm}
            onSubmit={handleSubmitRole}
          >
            <Select
              value={selectedRole}
              options={getAllRolesOptions(allRoles)}
              onChange={handleRoleChange}
              resetText="Не выбрано"
              placeholder="Выбрать роль"
              className={styles.select}
              disabled={!allRoles?.length}
            />
            <Button
              type="submit"
              className={styles.addRoleButton}
              disabled={addRoleButtonDisabled}
            >
              Добавить роль
            </Button>
            {userSetRoleError.current && (
              <p className={cx('red', styles.addRoleError)}>
                Произошла ошибка
              </p>
            )}
          </form>
        </TableCell>
      </TableRow>
    </Table>
  );
};

export default Details;
