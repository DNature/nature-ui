import * as React from 'react';
import { render } from '@nature-ui/test-utils';

import { Avatar, AvatarGroup } from '../src';

describe('@nature-ui/avatar', () => {
  test('AvatarGroup renders correctly', () => {
    const tools = render(
      <AvatarGroup>
        <Avatar />
      </AvatarGroup>,
    );

    expect(tools.asFragment()).toMatchSnapshot();
  });

  test('renders a number avatar showing count of truncated avatars', () => {
    const tools = render(
      <AvatarGroup max={2}>
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarGroup>,
    );

    const moreLabel = tools.getByText('+3');

    expect(moreLabel).toBeInTheDocument();
  });
});
