import * as React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import Alert from './lib/alert';

export default {
  decorators: [withKnobs],
  title: 'Alert',
};

export const primary: React.FC = () => {
  return <Alert />;
};