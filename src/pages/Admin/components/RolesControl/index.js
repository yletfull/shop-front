import React from 'react';
import { Table, Container } from 'react-bootstrap';
import { usersRoles, usersRolesIds, usersRolesTitles } from '@/constants/usersRoles';

const RolesControl = () => (
  <Container className="d-flex flex-column">
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>
            роль
          </th>
          <th>
            id
          </th>
          <th>
            описание
          </th>
        </tr>
      </thead>

      {Object.keys(usersRoles).map((role) => (
        <tbody>
          <tr>
            <td>
              {role}
            </td>
            <td>
              {usersRolesIds[role]}
            </td>
            <td>
              {usersRolesTitles[role]}
            </td>
          </tr>
        </tbody>
      ))}

    </Table>
  </Container>
);

export default RolesControl;
