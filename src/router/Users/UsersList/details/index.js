/* eslint-disable react/no-array-index-key */

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Spinner from '@/components/Spinner';
import { fetchUserDetails, fetchUserRoles } from '@/store/users/actions';
import dayjs from '@/utils/day';
import Tag from '@/components/Tag';
import Button from '@/components/Button';
import TimesCircleIcon from '@/icons/TimesCircle';
import styles from './styles.module.scss';


const Details = function RolesDetailsScreen() {
  const dispatch = useDispatch();

  const [isFetching, setIsFetching] = useState(false);

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

  const { userId } = useParams();
  useEffect(() => {
    const fetchUsersFn = async () => {
      setIsFetching(true);
      await dispatch(fetchUserDetails({ userId }));
      await dispatch(fetchUserRoles({ userId }));
      setIsFetching(false);
    };
    fetchUsersFn();
  }, [dispatch, userId]);

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
                  && userRoles.current.map((role, ind) => (
                    <div
                      className={styles.roleItem}
                      key={ind}
                    >
                      <Tag text={role.title} />
                      <Button
                        appearance="control"
                        className={styles.removeRoleButton}
                      >
                        <TimesCircleIcon />
                      </Button>
                    </div>
                  ))}
              </div>
            </td>
          </tr>


        </tbody>
      </table>
    </div>
  );
};

export default Details;
