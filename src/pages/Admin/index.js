import React from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';
import UsersControl from './components/UsersControl';
import RolesControl from './components/RolesControl';
import ShopControl from './components/ShopControl';

const Admin = () => (
  <Container className="d-flex flex-column mt-4">
    <Tabs defaultActiveKey="users" id="uncontrolled-tab-example" className="mb-3">
      <Tab eventKey="users" title="Пользователи">
        <UsersControl />
      </Tab>
      <Tab eventKey="roles" title="Роли">
        <RolesControl />
      </Tab>
      <Tab eventKey="shop" title="Магазин">
        <ShopControl />
      </Tab>
    </Tabs>
  </Container>
);

export default Admin;
