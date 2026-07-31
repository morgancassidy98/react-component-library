import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your name',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'you@example.com',
    helperText: 'We will never share your email with anyone.',
  },
};

export const Required: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your name',
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'you@example.com',
    required: true,
    errorText: 'Please enter a valid email address.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your name',
    disabled: true,
    helperText: 'This field is currently unavailable.',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
    required: true,
    helperText: 'Must be at least 8 characters.',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Search',
    type: 'search',
    placeholder: 'Search records...',
    fullWidth: true,
  },
};