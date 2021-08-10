import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Radio from './index';

storiesOf('components/Radio', module)
  .addDecorator(withKnobs)
  .add('index', () => (
    <Radio />
  ));
