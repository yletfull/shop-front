import React from 'react';
import {
  Container,
  Grid,
  Paper,
} from '@mui/material';
import Carousel from '@/components/Carousel';
import PropTypes from 'prop-types';
import RightSide from './components/RigthSide';
import BottomTabs from './components/BottomTabs';

const propTypes = {
  device: PropTypes.objectOf(PropTypes.any),
  images: PropTypes.arrayOf(PropTypes.any),
  onAddFeedbackModalSubmit: PropTypes.func,
};

const defaultProps = {
  device: {},
  images: [],
  onAddFeedbackModalSubmit: () => {},
};

const DevicePage = ({
  device,
  images,
  onAddFeedbackModalSubmit,
}) => (
  <Container>
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'row',
        padding: 2,
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          mt: 1,
        }}
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
          <RightSide
            device={device}
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <BottomTabs
            device={device}
            onAddFeedbackModalSubmit={onAddFeedbackModalSubmit}
          />
        </Grid>
      </Grid>
    </Paper>
  </Container>
);

DevicePage.propTypes = propTypes;
DevicePage.defaultProps = defaultProps;

export default DevicePage;
