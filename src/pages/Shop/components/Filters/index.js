/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Multiselect from '@/components/Multiselect';
import Select from '@/components/Select';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Input from '@/components/Input';
import DeviceStore from '@/store/Devices';
import { Button } from '@mui/material';
import styles from './styles.module.scss';
import { getOptions } from './utils';

const FiltersBar = observer(() => {
  const device = DeviceStore;

  const [selectedType, setSelectedType] = useState();
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRating, setSelectedRating] = useState();
  const [selectedPrice, setSelectedPrice] = useState({});

  const handleTypesChange = (e) => setSelectedType(e);
  const handleBrandsChange = (e) => setSelectedBrands(e);
  const handleRatingChange = (e) => setSelectedRating(e);
  const handlePriceChange = ({ event, option }) => {
    const { value } = event.currentTarget;
    setSelectedPrice((prev) => ({ ...prev, [option]: value }));
  };

  const handleFiltersAccept = () => {
    device.setSelectedType(selectedType);
    device.setSelectedBrands(selectedBrands);
    device.setSelectedRating(selectedRating);
    device.setSelectedPrice(selectedPrice);
  };

  return (
    <Accordion disableGutters className={styles.menuAccordion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography>
          Фильтры
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Select
          label={'Категория'}
          options={getOptions(device.types)}
          value={selectedType}
          className={styles.menuAccordionSelect}
          onChange={(values) => handleTypesChange(values)}
        />

        <Multiselect
          label={'Брэнд'}
          options={getOptions(device.brands)}
          value={selectedBrands}
          className={styles.menuAccordionSelect}
          onChange={(values) => handleBrandsChange(values)}
        />

        <Select
          label={'Рейтинг'}
          options={getOptions(device.ratings)}
          value={selectedRating}
          className={styles.menuAccordionSelect}
          onChange={(values) => handleRatingChange(values)}
        />


        <div className={styles.menuAccordionSelectWrapper}>
          <Input
            units="₽"
            id="price-from"
            type="number"
            label="от"
            value={selectedPrice.from}
            onChange={(event) => handlePriceChange({
              event,
              option: 'from',
            })}
          />

          -

          <Input
            units="₽"
            id="price-to"
            type="number"
            label="до"
            value={selectedPrice.to}
            onChange={(event) => handlePriceChange({
              event,
              option: 'to',
            })}
          />
        </div>

        <Button
          variant="text"
          className={styles.menuAccordionAcceptButton}
          onClick={handleFiltersAccept}
        >
          Применить фильтры
        </Button>

      </AccordionDetails>
    </Accordion>
  );
});

export default FiltersBar;
