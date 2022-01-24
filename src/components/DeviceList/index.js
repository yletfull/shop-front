import React from 'react';
import { observer } from 'mobx-react-lite';
import { Row } from 'react-bootstrap';
import DeviceItem from '@/components/DeviceItem';
import DeviceStore from '@/store/Devices';

const DeviceList = observer(() => {
  const device = DeviceStore;

  return (
    <Row className="d-flex">
      {device.devices.map((d) =>
        <DeviceItem key={d.id} device={d} />
      )}
    </Row>
  );
});

export default DeviceList;
