import React from 'react';
import { DemoComponent } from './index';

const Story = {
  title: 'Demo',
  component: DemoComponent,
};

export default Story;

const Template = args => <DemoComponent {...args} />;

export const Basic = Template.bind({});
Basic.args = {};
