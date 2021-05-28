import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import TableView from './index';

storiesOf('components/TableView', module)
  .addDecorator(withKnobs)
  .add('index', () => (
    <TableView />
  ));
