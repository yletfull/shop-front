import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: (ITEM_HEIGHT * 4.5) + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  })).isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  required: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
};

const defaultProps = {
  required: false,
  id: '',
  label: '',
  bottomLabel: '',
  value: '',
  onChange: () => {},
};

const Multiselect = function MultipleSelectCheckmarks({
  id,
  options,
  label,
  onChange,
}) {
  const [result, setResult] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value: targetValue },
    } = event;
    const mapValues = [...new Set(targetValue
      .map((value) => value
        .split(', '))
      .flat())];
    setResult(
      typeof mapValues === 'string' ? mapValues.split(', ') : mapValues,
    );
    onChange(result);
  };

  const allCheckedValue = options.map((option) => option.value);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id={`${id}_label`}>
          {label}
        </InputLabel>

        <Select
          labelId={`${id}_label`}
          id={id}
          multiple
          value={result}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          <MenuItem
            key={'all'}
            value={allCheckedValue.join(', ')}
          >
            <Checkbox
              checked={allCheckedValue.every((value) => result.includes(value))}
            />
            <ListItemText primary="Выбрать все" />
          </MenuItem>

          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
            >
              <Checkbox checked={result.indexOf((option.value)) > -1} />
              <ListItemText primary={option.value} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

Multiselect.propTypes = propTypes;
Multiselect.defaultProps = defaultProps;

export default Multiselect;
