import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
} from '@mui/material';
import TabPanel from '@/components/TabPanel';
import PropTypes from 'prop-types';
import InfoView from '../InfoView';
import FeedbackView from '../FeedbackView';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const propTypes = {
  device: PropTypes.objectOf(PropTypes.any),
  onAddFeedbackModalSubmit: PropTypes.func,
};

const defaultProps = {
  device: {},
  onAddFeedbackModalSubmit: () => {},
};

const BottomTabs = ({
  device,
  onAddFeedbackModalSubmit,
}) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (<Box sx={{ width: '100%' }}>
    <Box
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{ mt: 5 }}
        textColor="inherit"
      >
        <Tab
          label="Характеристики"
          {...a11yProps(0)}
        />
        <Tab
          label="Вопросы"
          {...a11yProps(1)}
        />
        <Tab
          label={`Отзывы (${device?.feedback?.length || 0})`}
          {...a11yProps(2)}
        />
      </Tabs>
    </Box>
    <TabPanel
      value={value}
      index={0}
    >
      <InfoView
        info={device.info}
      />
    </TabPanel>
    <TabPanel
      value={value}
      index={1}
    >
      Item Two
    </TabPanel>
    <TabPanel
      value={value}
      index={2}
    >
      <FeedbackView
        feedback={device.feedback}
        onAddFeedbackModalSubmit={onAddFeedbackModalSubmit}
      />
    </TabPanel>
  </Box>);
};

BottomTabs.propTypes = propTypes;
BottomTabs.defaultProps = defaultProps;

export default BottomTabs;
