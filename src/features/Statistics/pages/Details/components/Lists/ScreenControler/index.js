import React from 'react';
import PropTypes from 'prop-types';
import Tasks from '../Tasks';
import Campaigns from '../Campaigns';
import Platforms from '../Platforms';
import Sites from '../Sites';
import Spheres from '../Spheres';

const propTypes = {
  entity: PropTypes.oneOf([
    'tasks',
    'campaigns',
    'platforms',
    'sites',
    'spheres',
  ]).isRequired,
};

const ScreenControler = function StatisticsDetailsListScreenControler({
  entity,
  ...props
}) {
  switch (entity) {
    case 'tasks':
      return (
        <Tasks
          {...props}
        />
      );
    case 'campaigns': {
      return (
        <Campaigns
          {...props}
        />
      );
    }
    case 'platforms': {
      return (
        <Platforms
          {...props}
        />
      );
    }
    case 'sites': {
      return (
        <Sites
          {...props}
        />
      );
    }
    case 'spheres': {
      return (
        <Spheres
          {...props}
        />
      );
    }
    default:
      return null;
  }
};

ScreenControler.propTypes = propTypes;

export default ScreenControler;
