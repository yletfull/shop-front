/* eslint-disable react/no-array-index-key */

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Spinner from '@/components/Spinner';
import { fetchUserDetails, fetchUserRoles, fetchAllRoles, setUserRoles } from '@/store/users/actions';
import dayjs from '@/utils/day';
import Tag from '@/components/Tag';
import Button from '@/components/Button';
import Select from '@/components/Select';
import TimesCircleIcon from '@/icons/TimesCircle';
import styles from './styles.module.scss';


const Details = function RolesDetailsScreen() {
  const dispatch = useDispatch();

  const [isFetching, setIsFetching] = useState(false);
  const [addRoleButtonDisabled, setAddRoleButtonDisabled] = useState(false);
  const [selectedRole, setSelectedRole] = useState();

  const userData = useSelector((state) => state.users.userDetails);
  const userDetails = useRef(userData);
  useLayoutEffect(() => {
    userDetails.current = userData;
  }, [userData]);

  const userRolesData = useSelector((state) => state.users.userRoles);
  const userRoles = useRef(userRolesData);
  useLayoutEffect(() => {
    userRoles.current = userRolesData;
  }, [userRolesData]);

  const allRolesData = useSelector((state) => state.users.allRoles);
  const allRoles = useRef(allRolesData);
  useLayoutEffect(() => {
    allRoles.current = allRolesData;
  }, [allRolesData]);

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

  const getAllRolesOptions = () => {
    if (allRoles.current?.length) {
      return allRoles.current.map((role) => ({
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
    if (userRoles.current.length) {
      roles.push(...userRoles.current.map((el) => el.name));
    }
    setAddRoleButtonDisabled(true);
    await dispatch(setUserRoles({ userId, ...roles }));
    await dispatch(fetchUserDetails({ userId }));
    await dispatch(fetchUserRoles({ userId }));
    setAddRoleButtonDisabled(false);
  };

  const handleRemoveRoleButtonClick = async (e) => {
    const { rolename } = e.target.dataset;
    dispatch({ roleName: rolename, userId });
  };

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <div>
      <table>
        <tbody>
          <tr content="">
            <td>
              Идентификатор
            </td>
            <td>
              {userDetails.current.id || '-'}
            </td>
          </tr>

          <tr content="">
            <td>
              Логин
            </td>
            <td>
              {userDetails.current.login || '-'}
            </td>
          </tr>

          <tr content="">
            <td>
              E-mail
            </td>
            <td>
              {userDetails.current.email || '-'}
            </td>
          </tr>

          <tr content="">
            <td>
              Телефон
            </td>
            <td>
              {userDetails.current.phone || '-'}
            </td>
          </tr>

          <tr content="">
            <td>
              Создан
            </td>
            <td>
              {dayjs(userDetails.current.createdAt, 'YYYY:MM:DD HH:mm:ss')}
            </td>
          </tr>

          <tr content="">
            <td>
              Обновлен
            </td>
            <td>
              {dayjs(userDetails.current.uploadAt, 'YYYY:MM:DD HH:mm:ss')}
            </td>
          </tr>


          <tr content="">
            <td>
              Роли:
            </td>
            <td>
              <div className={styles.tagsWrapper}>
                {userRoles.current?.length
                  ? userRoles.current.map((role, ind) => (
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
            </td>
          </tr>

          <tr content="">
            <td>
              Добавить роль
            </td>
            <td>
              <form onSubmit={handleSubmitRole}>
                <Select
                  value={selectedRole}
                  options={getAllRolesOptions(allRoles.current)}
                  onChange={handleRoleChange}
                  resetText="Не выбрано"
                  placeholder="Выбрать роль"
                  className={styles.select}
                  disabled={!allRoles.current?.length || addRoleButtonDisabled}
                />
                <Button
                  type="submit"
                  className={styles.addRoleButton}
                  disabled={addRoleButtonDisabled}
                >
                  Добавить роль
                </Button>
              </form>

            </td>
          </tr>


        </tbody>
      </table>
    </div>
  );
};

export default Details;
