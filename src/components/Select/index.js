/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styles from './styles.module.scss';

const propTypes = {
  required: PropTypes.bool,
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
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  label: PropTypes.string,
  bottomLabel: PropTypes.string,
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

const SelectComponent = ({
  required,
  id,
  options,
  value,
  label,
  bottomLabel,
  onChange,
  ...props
}) => {
  const handleChange = (e, data) => onChange(data.props.value);

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id={`${id}_label`}>
        {label}
      </InputLabel>

      <Select
        className={styles.select}
        labelId={`${id}_label`}
        id={id}
        value={value}
        label={label}
        onChange={handleChange}
        required={required}
        {...props}
      >
        {!required && (
          <MenuItem value="">
            <em>
              Не выбрано
            </em>
          </MenuItem>
        )}

        {options.map((option) => (
          <MenuItem value={option.value}>
            {option.text}
          </MenuItem>
        ))}
      </Select>

      {bottomLabel && (
        <FormHelperText>
          {bottomLabel}
        </FormHelperText>
      )}

    </FormControl>
  );
};

SelectComponent.propTypes = propTypes;
SelectComponent.defaultProps = defaultProps;

export default SelectComponent;
