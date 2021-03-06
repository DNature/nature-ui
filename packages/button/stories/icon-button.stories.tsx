import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Stack } from '@nature-ui/layout';
import { SearchIcon, PhoneIcon } from '@nature-ui/icons';
import { HiHeart } from 'react-icons/hi';

import { IconButton } from '../src';

export default {
  title: 'Button/IconButton',
  component: IconButton,
} as Meta;

export const iconButton = () => (
  <Stack row>
    <IconButton aria-label='Search database' icon={<SearchIcon />} />

    <IconButton
      color='orange-500'
      aria-label='Search database'
      icon={<HiHeart />}
    />

    <IconButton color='gray-400' aria-label='Call Segun' size='lg'>
      <PhoneIcon />
    </IconButton>
  </Stack>
);
