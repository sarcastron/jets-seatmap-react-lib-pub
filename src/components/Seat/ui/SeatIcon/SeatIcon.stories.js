import React from 'react';
import { SeatIcon } from '.';

const Story = {
  title: 'Seat class',
  component: SeatIcon,
  argTypes: {
    seatType: {
      defaultValue: 'E',
      options: ['E', 'P', 'F', 'F-1', 'F-2', 'F-3', 'B', 'B-1', 'B-4'],
      control: { type: 'select' },
    },
    style: {
      defaultValue: {
        strokeColor: '#B2BB44',
        armrestColor: 'rgb(185,186,186)',
        fillColor: 'rgb(237, 237, 237)',
        strokeWidth: 1,
      },
    },
  },
};

export default Story;

const Template = args => <SeatIcon {...args} />;

export const Economy = Template.bind({});
Economy.args = {};

export const Premium = Template.bind({});
Premium.args = {
  seatType: 'P',
};

export const First = Template.bind({});
First.args = {
  seatType: 'F',
};

export const FirstOne = Template.bind({});
FirstOne.args = {
  seatType: 'F-1',
};

export const FirstSecond = Template.bind({});
FirstSecond.args = {
  seatType: 'F-2',
};

export const FirstThird = Template.bind({});
FirstThird.args = {
  seatType: 'F-3',
};

export const Business = Template.bind({});
Business.args = {
  seatType: 'B',
};

export const BusinessOne = Template.bind({});
BusinessOne.args = {
  seatType: 'B-1',
};

export const BusinessFour = Template.bind({});
BusinessFour.args = {
  seatType: 'B-4',
};
