import React, { useEffect, useState } from 'react';
import { Button, Container, Table, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import ErrorMessageBlock from '@/components/ErrorMessageBlock';
import service from '@/pages/Admin/service';
import { SHOP_ROUTE } from '@/router/constants';
import { useFormik } from 'formik';

const RolesControl = () => {
  const history = useHistory();

  const [roles, setRoles] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [editItemId, setEditItemId] = useState(null);

  const fetchTableData = async () => {
    setIsFetching(true);
    try {
      setRoles(await service.getRoles());
      setError(null);
    } catch (err) {
      setError(err);
    }
    setIsFetching(false);
  };
  useEffect(() => {
    fetchTableData();
  }, []);

  const formik = useFormik({
    initialValues: { roles },
    onSubmit: async (data) => {
      const currentRole = data.roles.find((role) => role.id === editItemId);
      await service.setUser(currentRole);

      setEditItemId(null);
      fetchTableData();
    },
  });

  useEffect(() => {
    formik.setValues({ roles });
  }, [roles]);

  const handleEditItem = (e) => {
    const { itemId } = e.currentTarget.dataset;
    setEditItemId(Number(itemId));
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

            <th colSpan={2}>
              роль
            </th>
          </tr>
        </thead>

        <tbody>
          {roles.length
            ? roles.map((role, index) => {
              const isEdit = editItemId === role.id;

              return (
                <tr>
                  <td>
                    {role.id}
                  </td>

                  <td>
                    {isEdit
                      ? <Form.Control
                        name={`roles[${index}]email`}
                        onChange={formik.handleChange}
                        value={formik.values.roles[index]?.email}
                        disabled={isFetching}
                      />
                      : role.email
                    }
                  </td>

                  <td
                    style={{ maxWidth: 120 }}
                    align="center"
                  >
                    <Button
                      data-item-id={role.id}
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

export default RolesControl;
