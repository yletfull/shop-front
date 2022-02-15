/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { InputAdornment, TextField } from '@mui/material';


const propTypes = {
  error: PropTypes.any,
  required: PropTypes.bool,
  units: PropTypes.string,
  defaultValue: PropTypes.string,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  label: PropTypes.string,
  onChange: PropTypes.func,
};

const defaultProps = {
  error: null,
  required: false,
  defaultValue: '',
  units: '',
  id: '',
  label: null,
  value: '',
  onChange: () => {},
};

const InputComponent = ({
  error,
  required,
  defaultValue,
  units,
  id,
  label,
  value,
  onChange,
  ...props
}) => (
  <TextField
    sx={{ m: 1, width: 300 }}
    error={error}
    required={required}
    id={id}
    label={label}
    value={value}
    defaultValue={defaultValue}
    onChange={onChange}
    InputProps={{
      startAdornment: <InputAdornment position="start">{units}</InputAdornment>,
    }}
    {...props}
  />
);

InputComponent.propTypes = propTypes;
InputComponent.defaultProps = defaultProps;

export default InputComponent;
