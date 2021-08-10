import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Modal from './index';

storiesOf('components/Modal', module)
  .addDecorator(withKnobs)
  .add('index', () => (
    <Modal />
  ));
