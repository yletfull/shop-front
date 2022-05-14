/* eslint-disable react/jsx-indent */
import React from 'react';
import {
  Paper, TableBody, TableRow, TableCell, TableContainer,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

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
  <TableContainer
    component={Paper}
    sx={{ boxShadow: 0 }}
  >
    <Table
      sx={{
        minWidth: 650,
        boxShadow: 0,
      }}
      size="large"
    >
      <TableBody>
        {info.length > 0
          ? info.map((row) => (
            <TableRow
              key={row.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>

              <TableCell component="th" scope="row">
                {row.value}
              </TableCell>
            </TableRow>
          )) : <TableRow>
            Нет данных
          </TableRow>}
      </TableBody>
    </Table>
  </TableContainer>
);

InfoView.propTypes = propTypes;
InfoView.defaultProps = defaultProps;

export default InfoView;
