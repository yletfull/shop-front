import React from 'react';
import {
  Container,
  Grid,
  Paper,
} from '@mui/material';
import Carousel from '@/components/Carousel';
import PropTypes from 'prop-types';
import RightSide from './components/RigthSide';
import Info from './components/Info';

const propTypes = {
  device: PropTypes.objectOf(PropTypes.any),
  images: PropTypes.arrayOf(PropTypes.any),
};

const defaultProps = {
  device: {},
  images: [],
};

const DevicePage = ({
  device,
  images,
}) => (
  <Container>
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'row',
        padding: 2 }}
    >
      <Grid
        container
        spacing={2}
        sx={{ mt: 1 }}
      >
        <Grid
          item
          xs={6}
        >
          <Carousel
            images={images}
          />
        </Grid>
        <Grid
          item
          xs={6}
        >
          <Info
            device={device}
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <RightSide
            device={device}
          />
        </Grid>
      </Grid>
    </Paper>
  </Container>
);

DevicePage.propTypes = propTypes;
DevicePage.defaultProps = defaultProps;

export default DevicePage;
