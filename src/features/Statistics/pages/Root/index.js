import React from 'react';
import { Redirect } from 'react-router-dom';

const StatisticsRoot = function StatisticsRootPage() {
  return (
    <Redirect to="/statistics/lists/tasks" />
  );
};

export default StatisticsRoot;
