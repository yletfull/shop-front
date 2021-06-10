import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Checkbox from './index';

storiesOf('components/Checkbox', module)
  .addDecorator(withKnobs)
  .add('index', () => (
    <Checkbox />
  ));
