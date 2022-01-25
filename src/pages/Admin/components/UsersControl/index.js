import React, { useEffect, useState } from 'react';
import { Button, Container, Table, Form, Dropdown } from 'react-bootstrap';
import CustomMenu from '@/components/CustomMenu';
import CustomToggle from '@/components/CustomToggle';
import { useHistory } from 'react-router-dom';
import ErrorMessageBlock from '@/components/ErrorMessageBlock';
import service from '@/pages/Admin/service';
import dayjs from 'dayjs';
import { timeFormat } from '@/constants/formats';
import { SHOP_ROUTE } from '@/router/constants';
import { useFormik } from 'formik';
import { usersRoles } from '@/constants/usersRoles';

const UsersControl = () => {
  const history = useHistory();

  const [users, setUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [editItemId, setEditItemId] = useState(null);

  const fetchTableData = async () => {
    setIsFetching(true);
    try {
      setUsers(await service.getUsers());
      setError(null);
    } catch (err) {
      setError(err);
    }
    setIsFetching(false);
  };

  const formik = useFormik({
    initialValues: { users },
    onSubmit: async (data) => {
      const currnetUser = data.users.find((user) => user.id === editItemId);
      await service.setUser(currnetUser);

      setEditItemId(null);
      fetchTableData();
    },
  });

  useEffect(() => {
    formik.setValues({ users });
  }, [users]);

  useEffect(() => {
    fetchTableData();
  }, []);

  const handleEditItem = (e) => {
    const { itemId } = e.currentTarget.dataset;
    setEditItemId(Number(itemId));
  };

  const handleRoleSelect = (role, index) => {
    formik.setFieldValue(`users[${index}]role`, role);
  };

  const handleSaveItem = () => {
    formik.handleSubmit();
  };

  return (
    <Container className="d-flex flex-column">
      <ErrorMessageBlock error={error} />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              id
            </th>

            <th>
              e-mail
            </th>

            <th>
              логин
            </th>

            <th>
              дата регистрации
            </th>

            <th colSpan={2}>
              роль
            </th>
          </tr>
        </thead>

        <tbody>
          {users.length
            ? users.map((user, index) => {
              const isEdit = editItemId === user.id;

              return (
                <tr>
                  <td>
                    {user.id}
                  </td>

                  <td>
                    {isEdit
                      ? <Form.Control
                        name={`users[${index}]email`}
                        onChange={formik.handleChange}
                        value={formik.values.users[index]?.email}
                        disabled={isFetching}
                      />
                      : user.email
                    }
                  </td>

                  <td>
                    {isEdit
                      ? <Form.Control
                        name={`users[${index}]login`}
                        onChange={formik.handleChange}
                        value={formik.values.users[index]?.login}
                        disabled={isFetching}
                      />
                      : user.login
                    }
                  </td>

                  <td>
                    {dayjs(user.createdAt).format(timeFormat)}
                  </td>

                  <td>
                    {isEdit
                      ? <Dropdown onSelect={(role) => handleRoleSelect(role, index)}>
                        <Dropdown.Toggle as={CustomToggle}>
                          {formik.values.users[index]?.role}
                        </Dropdown.Toggle>

                        <Dropdown.Menu as={CustomMenu}>
                          {Object.values(usersRoles).map((role) => (
                            <Dropdown.Item eventKey={role}>
                              {role}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                      : user.role
                    }
                  </td>

                  <td
                    style={{ maxWidth: 120 }}
                    align="center"
                  >
                    <Button
                      data-item-id={user.id}
                      onClick={isEdit ? handleSaveItem : handleEditItem}
                      variant="outline-primary"
                      disabled={isFetching}
                    >
                      {!isFetching && isEdit ? 'Сохранить' : 'Редактировать' }
                    </Button>
                  </td>
                </tr>
              );
            }) :
            (<tr>
              <td>
              Нет данных
              </td>
            </tr>)}

        </tbody>
      </Table>

      <Button onClick={() => history.push(SHOP_ROUTE)}>
        Назад
      </Button>
    </Container>
  );
};

export default UsersControl;
