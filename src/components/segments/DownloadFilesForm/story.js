import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import DownloadFilesForm from './index';

storiesOf('components/DownloadFilesForm', module)
  .addDecorator(withKnobs)
  .add('index', () => (
    <DownloadFilesForm />
  ));
