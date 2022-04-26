import React from 'react';
import { storiesOf } from '@storybook/react';
import { DemoComponent } from '../components/Demo';

const stories = storiesOf('Jets SeatMap', module);

stories.add('Demo', () => {
  return <DemoComponent />;
});
