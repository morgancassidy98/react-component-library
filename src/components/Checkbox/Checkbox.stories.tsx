import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'I agree to the terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    label: 'I agree to the terms and conditions',
    defaultChecked: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Subscribe to newsletter',
    helperText: 'You can unsubscribe at any time.',
  },
};

export const WithError: Story = {
  args: {
    label: 'I agree to the terms and conditions',
    errorText: 'You must accept the terms to continue.',
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Select all',
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'I agree to the terms and conditions',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'I agree to the terms and conditions',
    disabled: true,
    defaultChecked: true,
  },
};