import React from 'react';
import { observer } from 'mobx-react-lite';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeviceStore from '@/store/Devices';
import styles from './styles.module.scss';

const TypeBar = observer(() => {
  const device = DeviceStore;

  return (
    <ButtonGroup
      orientation="vertical"
      aria-label="vertical contained button group"
      className={styles.typeBarWrapper}
    >
      {device.types.map(type =>
        <Button
          onClick={() => device.setSelectedType(type)}
          data-active={type.id === device.selectedType.id}
          className={styles.typeBarButton}
          key={type.id}
        >
          {type.name}
        </Button>
      )}
    </ButtonGroup>
  );
});

export default TypeBar;
