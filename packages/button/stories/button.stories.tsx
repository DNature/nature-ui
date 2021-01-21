import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Stack } from '@nature-ui/layout';
import { SearchIcon, PhoneIcon, Io } from '@nature-ui/icons';

import { Button, ButtonType, ButtonSpinner, IconButton } from '../src';

export default {
  title: 'Button',
  component: Button,
} as Meta;

type ButtonStoryType = Story<ButtonType>;

const Template: ButtonStoryType = (args) => <Button {...args} />;

export const Default: ButtonStoryType = Template.bind({});
Default.args = {
  children: 'Click me',
};

export const Outlined: ButtonStoryType = Template.bind({});
Outlined.args = {
  text: 'blue-500',
  variant: 'outline',
  children: 'Click me!',
};

export const Ghost: ButtonStoryType = Template.bind({});
Ghost.args = {
  text: 'blue-500',
  variant: 'ghost',
  children: 'Hover me!',
};

export const Link: ButtonStoryType = Template.bind({});
Link.args = {
  text: 'blue-500',
  variant: 'link',
  children: 'Click me!',
};

export const Sizes = () => {
  return (
    <Stack spacing='1rem'>
      <Button size='xs' color='blue-500' variant='solid'>
        Button
      </Button>
      <Button size='sm' color='blue-500' variant='solid'>
        Button
      </Button>
      <Button size='md' color='blue-500' variant='solid'>
        Button
      </Button>
      <Button size='lg' color='blue-500' variant='solid'>
        Button
      </Button>
    </Stack>
  );
};

export const IsDisabled: ButtonStoryType = Template.bind({});

IsDisabled.args = {
  isDisabled: true,
  children: 'Disabled',
};

export const IsLoading = () => {
  return (
    <>
      <Button
        color='blue-500'
        variant='outline'
        isLoading
        loadingText='Submitting...'
        size='md'
      >
        Button
      </Button>
      <Button
        color='blue-500'
        variant='solid'
        isLoading
        loadingText='loading...'
        size='md'
        className='ml-4'
      >
        Button
      </Button>
      <Button color='blue-500' variant='solid' isLoading className='ml-4'>
        Email
      </Button>
    </>
  );
};

export const Red = () => {
  return (
    <Button color='red-500' variant='solid'>
      Button
    </Button>
  );
};

export const buttonSpinner = () => {
  return <ButtonSpinner />;
};

export const iconButton = () => (
  <Stack direction='row'>
    <IconButton aria-label='Search database' icon={<SearchIcon />} />

    <IconButton
      color='orange-500'
      aria-label='Search database'
      icon={<SearchIcon />}
    />

    <IconButton color='gray-400' aria-label='Call Segun' size='lg'>
      <PhoneIcon />
    </IconButton>
  </Stack>
);

export const WithIcon = () => {
  return (
    <Stack spacing='1rem' direction='row'>
      <Button leftIcon={<SearchIcon />} variant='solid'>
        Search
      </Button>
      <Button rightIcon={<Io.IoLogoGithub />} variant='ghost' text='teal-600'>
        Github
      </Button>
    </Stack>
  );
};
