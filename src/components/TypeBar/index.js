import React from 'react';
import { observer } from 'mobx-react-lite';
import ListGroup from 'react-bootstrap/ListGroup';
import DeviceStore from '../../store/Devices';

const TypeBar = observer(() => {
  const device = DeviceStore;
  return (
    <ListGroup>
      {device.types.map(type =>
        <ListGroup.Item
          style={{ cursor: 'pointer' }}
          active={type.id === device.selectedType.id}
          onClick={() => device.setSelectedType(type)}
          key={type.id}
        >
          {type.name}
        </ListGroup.Item>
      )}
    </ListGroup>
  );
});

export default TypeBar;
