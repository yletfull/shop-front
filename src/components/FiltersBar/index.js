/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Multiselect from '@/components/Multiselect';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Input from '@/components/Input';
import DeviceStore from '@/store/Devices';
import { Button } from '@mui/material';
import styles from './styles.module.scss';
import { getOptions } from './utils';

const FiltersBar = observer(() => {
  const device = DeviceStore;

  const [selectedTypes, setSelectedTypes] = useState({});
  const [selectedBrands, setSelectedBrands] = useState({});
  const [selectedRating, setSelectedRating] = useState(5);
  const [selectedPrice, setSelectedPrice] = useState({
    from: 0,
    to: 100000,
  });

  const handleTypesChange = (e) => setSelectedTypes(e);
  const handleBrandsChange = (e) => setSelectedBrands(e);
  const handleRatingChange = (e) => setSelectedRating(e);
  const handlePriceChange = ({ event, option }) => {
    const { value } = event.currentTarget;
    setSelectedPrice((prev) => ({ ...prev, [option]: value }));
  };
  const handleFiltersAccept = () => {};

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
        <Multiselect
          label={'Категория'}
          options={getOptions(device.types)}
          value={selectedTypes}
          className={styles.menuAccordionSelect}
          onChange={(values) => handleTypesChange(values, 'type')}
        />

        <Multiselect
          label={'Брэнд'}
          options={getOptions(device.brands)}
          value={selectedBrands}
          className={styles.menuAccordionSelect}
          onChange={(values) => handleBrandsChange(values, 'brand')}
        />

        <Multiselect
          label={'Рейтинг'}
          options={getOptions(device.brands)}
          value={selectedRating}
          className={styles.menuAccordionSelect}
          onChange={(values) => handleRatingChange(values, 'rating')}
        />

        <div className={styles.menuAccordionSelectWrapper}>
          <Input
            units="₽"
            id="price-from"
            label="от"
            onChange={(event) => handlePriceChange({
              event,
              option: 'from',
            })}
            value={selectedPrice.from}
          />

          -

          <Input
            units="₽"
            id="price-to"
            label="до"
            onChange={(event) => handlePriceChange({
              event,
              option: 'to',
            })}
            value={selectedPrice.to}
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
