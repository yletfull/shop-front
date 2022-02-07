import React from 'react';
import { observer } from 'mobx-react-lite';
import { Row } from 'react-bootstrap';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeviceStore from '@/store/Devices';
import styles from './styles.module.scss';

const BrandBar = observer(() => {
  const device = DeviceStore;

  return (
    <Row className="d-flex">
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical contained button group"
        className={styles.typeBarWrapper}
      >
        {device.brands.map((brand) =>
          <Button
            onClick={() => device.setSelectedBrand(brand)}
            data-active={brand.id === device.selectedBrand.id}
            className={styles.typeBarButton}
            key={brand.id}
          >
            {brand.name}
          </Button>
        )}
      </ButtonGroup>
    </Row>
  );
});

export default BrandBar;
