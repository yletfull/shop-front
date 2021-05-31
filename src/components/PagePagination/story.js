import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import PagePagination from './index';

storiesOf('components/PagePagination', module)
  .addDecorator(withKnobs)
  .add('index', () => (
    <PagePagination />
  ));
