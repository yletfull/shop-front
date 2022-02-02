import React, { useState } from 'react';
import { Button, Container, Tabs, Tab } from 'react-bootstrap';
import CreateBrand from '@/components/modals/CreateBrand';
import CreateDevice from '@/components/modals/CreateDevice';
import CreateType from '@/components/modals/CreateType';
import UsersControl from './components/UsersControl';
import RolesControl from './components/RolesControl';

const Admin = () => {
  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);

  return (
    <Container className="d-flex flex-column mt-4">
      <Tabs defaultActiveKey="users" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="users" title="Управление пользователями">
          <UsersControl />
        </Tab>
        <Tab eventKey="roles" title="Управление ролями">
          <RolesControl />
        </Tab>
      </Tabs>

      <Button
        variant={'outline-dark'}
        className="mt-4 p-2"
        onClick={() => setTypeVisible(true)}
      >
        Управление типом
      </Button>
      <Button
        variant={'outline-dark'}
        className="mt-4 p-2"
        onClick={() => setBrandVisible(true)}
      >
        Добавить бренд
      </Button>
      <Button
        variant={'outline-dark'}
        className="mt-4 p-2"
        onClick={() => setDeviceVisible(true)}
      >
        Добавить устройство
      </Button>

      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
    </Container>
  );
};

export default Admin;
