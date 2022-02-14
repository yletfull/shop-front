/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Multiselect from '@/components/Multiselect';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Checkbox, FormControlLabel } from '@mui/material';
import cx from 'classnames';
import DeviceStore from '@/store/Devices';
import Box from '@mui/material/Box';
import styles from './styles.module.scss';
import { getCheckboxIsChecked, getToggleCheckboxOptions, getBrandsOptions } from './utils';

const FiltersBar = observer(() => {
  const device = DeviceStore;

  const [checkboxesOptions, setCheckboxOptions] = useState([[{ checked: true }]]);

  const handleCheckboxClick = ({ index, level }) => {
    setCheckboxOptions({
      ...getToggleCheckboxOptions({ index, level, checkboxesOptions }),
    });
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

      {device.types.map(type =>
        <Accordion
          disableGutters
          className={cx(styles.menuAccordionColored)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={type.id}
          >
            <Typography>
              {type.name}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Multiselect options={getBrandsOptions(device.brands)} />

            <FormControlLabel
              label="Выбрать все"
              control={
                <Checkbox
                  checked={getCheckboxIsChecked(
                    { level: 0, index: 0, checkboxesOptions })}
                  onChange={() => handleCheckboxClick(
                    { level: 0, index: 0 })}
                />
              }
            />

            <Box className={styles.menuCheckboxWrapper}>
              {device.brands.map((brand, index) =>
                <FormControlLabel
                  label={brand.name}
                  control={
                    <Checkbox
                      checked={getCheckboxIsChecked(
                        { level: 0, index: index + 1, checkboxesOptions })
                      || getCheckboxIsChecked(
                        { level: 0, index: index + 1, checkboxesOptions })}
                      onChange={() => handleCheckboxClick(
                        { level: 0, index: index + 1 })}
                    />}
                />
              )}
            </Box>

          </AccordionDetails>
        </Accordion>
      )}
    </Accordion>
  );
});

export default FiltersBar;
