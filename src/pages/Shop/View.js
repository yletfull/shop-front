import React from 'react';
import ErrorMessageBlock from '@/components/ErrorMessageBlock';
import Spinner from '@/components/Spinner';
import PropTypes from 'prop-types';
import { Container, Paper } from '@mui/material';
import DeviceList from './components/DeviceList';
import Pagination from './components/Pagination';
import Filters from './components/Filters';

const propTypes = {
  devices: PropTypes.arrayOf(PropTypes.any),
  error: PropTypes.objectOf(PropTypes.any),
  isFetching: PropTypes.bool,
  types: PropTypes.arrayOf(PropTypes.any),
  brands: PropTypes.arrayOf(PropTypes.any),
  ratings: PropTypes.arrayOf(PropTypes.any),
  selectedBrands: PropTypes.arrayOf(PropTypes.any),
  selectedPrice: PropTypes.objectOf(PropTypes.any),
  selectedType: PropTypes.string,
  selectedRating: PropTypes.string,
  handleTypesChange: PropTypes.func,
  handleBrandsChange: PropTypes.func,
  handleRatingChange: PropTypes.func,
  handleFiltersAccept: PropTypes.func,
  handlePriceChange: PropTypes.func,
};

const defaultProps = {
  devices: [],
  error: null,
  isFetching: false,
  types: [],
  brands: [],
  ratings: [],
  selectedPrice: {},
  selectedType: null,
  selectedRating: null,
  selectedBrands: [],
  handleTypesChange: () => {},
  handleBrandsChange: () => {},
  handleRatingChange: () => {},
  handleFiltersAccept: () => {},
  handlePriceChange: () => {},
};

const View = ({
  devices,
  error,
  isFetching,
  types,
  brands,
  ratings,
  selectedType,
  selectedPrice,
  selectedRating,
  selectedBrands,
  handleTypesChange,
  handleBrandsChange,
  handleRatingChange,
  handleFiltersAccept,
  handlePriceChange,
}) => (
  <Container>
    {error && (
      <ErrorMessageBlock error={error} />
    )}

    <Paper variant="outlined">
      <Filters
        types={types}
        brands={brands}
        ratings={ratings}
        selectedType={selectedType}
        selectedPrice={selectedPrice}
        selectedRating={selectedRating}
        selectedBrands={selectedBrands}
        handleTypesChange={handleTypesChange}
        handleBrandsChange={handleBrandsChange}
        handleRatingChange={handleRatingChange}
        handleFiltersAccept={handleFiltersAccept}
        handlePriceChange={handlePriceChange}
      />
    </Paper>

    {!error && (
      <Paper
        variant="outlined"
        sx={{ mt: 2 }}
      >
        <Spinner
          isFetching={isFetching}
          overlay
        />

        {!isFetching && (
          <DeviceList
            devices={devices}
          />
        )}

        <Pagination />
      </Paper>
    )}
  </Container>
);

View.propTypes = propTypes;
View.defaultProps = defaultProps;

export default View;
