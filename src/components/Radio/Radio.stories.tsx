import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    label: 'Option A',
    value: 'a',
    name: 'example',
  },
};

export const Checked: Story = {
  args: {
    label: 'Option A',
    value: 'a',
    name: 'example-checked',
    defaultChecked: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Email',
    value: 'email',
    name: 'contact',
    helperText: 'We will contact you by email.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Option A',
    value: 'a',
    name: 'example-disabled',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Option A',
    value: 'a',
    name: 'example-disabled-checked',
    disabled: true,
    defaultChecked: true,
  },
};