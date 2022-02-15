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
import cx from 'classnames';
import DeviceStore from '@/store/Devices';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import styles from './styles.module.scss';
import { getToggleCheckboxOptions, getBrandsOptions } from './utils';

const FiltersBar = observer(() => {
  const device = DeviceStore;

  const [checkboxesOptions, setCheckboxOptions] = useState([[{ checked: true }]]);
  const [selectedBrands, setSelectedBrands] = useState({});
  const [selectedRating, setSelectedRating] = useState(5);
  const [selectedPrice, setSelectedPrice] = useState({
    from: 0,
    to: 100000,
  });

  const handleCheckboxClick = ({ index, level }) => {
    setCheckboxOptions({
      ...getToggleCheckboxOptions({ index, level, checkboxesOptions }),
    });
  };

  const handleFilterChange = (e) => setSelectedBrands(e);
  const handleBrandsChange = (e) => setSelectedBrands(e);
  const handleRatingChange = (e) => setSelectedRating(e);
  const handlePriceChange = ({ event, option }) => {
    const { value } = event.currentTarget;
    setSelectedPrice((prev) => ({ ...prev, [option]: value }));
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
        <Multiselect
          label={'Категория'}
          options={getBrandsOptions(device.types)}
          className={styles.menuAccordionSelect}
          onChange={(values) => handleBrandsChange(values, 'type')}
        />

        <Multiselect
          label={'Брэнд'}
          options={getBrandsOptions(device.brands)}
          className={styles.menuAccordionSelect}
          onChange={(values) => handleBrandsChange(values, 'brand')}
        />

        <Multiselect
          label={'Рейтинг'}
          options={getBrandsOptions(device.brands)}
          className={styles.menuAccordionSelect}
          onChange={(values) => handleRatingChange(values, 'rating')}
        />

        <div className={styles.menuAccordionSelectWrapper}>
          <Input
            units="₽"
            id="price-from"
            label="от"
            onChange={(e) => handlePriceChange({
              event: e,
              option: 'from',
            })}
            value={selectedPrice.from}
          />

              -

          <Input
            units="₽"
            id="price-to"
            label="до"
            onChange={(e) => handlePriceChange({
              event: e,
              option: 'to',
            })}
            value={selectedPrice.to}
          />
        </div>

        <Button
          variant="text"
          className={styles.menuAccordionAcceptButton}
        >
          Применить фильтры
        </Button>

      </AccordionDetails>
    </Accordion>
  );
});

export default FiltersBar;
