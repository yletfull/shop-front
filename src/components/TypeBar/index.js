/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Checkbox, FormControlLabel } from '@mui/material';
import TestCheckbox from '@/components/Checkbox';
import DeviceStore from '@/store/Devices';
import Box from '@mui/material/Box';
import styles from './styles.module.scss';
import { getCheckboxIsChecked, toggleCheckbox } from './utils';

const TypeBar = observer(() => {
  const device = DeviceStore;
  const [checkboxesOptions, setCheckboxOptions] = React.useState([[{ checked: true }]]);

  const handleCheckboxClick = ({ index, level }) => {
    console.log(toggleCheckbox({ index, level, checkboxesOptions }));
    setCheckboxOptions(toggleCheckbox({ index, level, checkboxesOptions }));
  };

  return (
    <React.Fragment>
      {device.types.map(type =>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            // aria-controls="panel1a-content"
            id={type.id}
          >
            <Typography>
              {type.name}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
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

            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
              {device.brands.map((brand, index) =>
                <FormControlLabel
                  label={brand.name}
                  control={
                    <Checkbox
                      onChange={() => handleCheckboxClick(
                        { level: 0, index: index + 1 })}
                    />}
                />
              )}
            </Box>

          </AccordionDetails>
        </Accordion>
      )}
    </React.Fragment>
  );
});

export default TypeBar;
