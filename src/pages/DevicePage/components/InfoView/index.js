/* eslint-disable react/jsx-indent */
import React from 'react';
import {
  Box, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';

const propTypes = {
  info: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      value: PropTypes.string,
    })
  ),
};

const defaultProps = {
  info: [],
};

const InfoView = ({
  info,
}) => (
  <Box>
    {info.length
      ? info.map((item) => (
        <Typography
          sx={{ '&:not(:first-of-type)': {
            mt: 2,
          } }}
        >
          {item.title}
          :
          {item.value}
        </Typography>
      )) : (
        <Typography>
          Нет информации
        </Typography>
      )}
  </Box>
);

InfoView.propTypes = propTypes;
InfoView.defaultProps = defaultProps;

export default InfoView;
