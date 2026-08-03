import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { RadioGroup } from './RadioGroup';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const contactOptions = [
  { value: 'email', label: 'Email', helperText: 'We will contact you by email.' },
  { value: 'phone', label: 'Phone', helperText: 'We will contact you by phone.' },
  { value: 'mail',  label: 'Mail',  helperText: 'We will contact you by post.' },
];

const planOptions = [
  { value: 'basic',    label: 'Basic' },
  { value: 'pro',      label: 'Pro' },
  { value: 'enterprise', label: 'Enterprise' },
];

const disabledOptions = [
  { value: 'active',   label: 'Active' },
  { value: 'pending',  label: 'Pending' },
  { value: 'archived', label: 'Archived', disabled: true },
];

// Wrapper for controlled state
const RadioGroupDemo = (args: any) => {
  const [value, setValue] = useState('');
  return <RadioGroup {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: (args) => <RadioGroupDemo {...args} />,
  args: {
    legend: 'Preferred Contact Method',
    name: 'contact',
    options: contactOptions,
  },
};

export const WithError: Story = {
  render: (args) => <RadioGroupDemo {...args} />,
  args: {
    legend: 'Preferred Contact Method',
    name: 'contact-error',
    options: contactOptions,
    errorText: 'Please select a contact method.',
    required: true,
  },
};

export const Disabled: Story = {
  render: (args) => <RadioGroupDemo {...args} />,
  args: {
    legend: 'Plan',
    name: 'plan-disabled',
    options: planOptions,
    disabled: true,
  },
};

export const WithDisabledOption: Story = {
  render: (args) => <RadioGroupDemo {...args} />,
  args: {
    legend: 'Status',
    name: 'status',
    options: disabledOptions,
  },
};

export const Required: Story = {
  render: (args) => <RadioGroupDemo {...args} />,
  args: {
    legend: 'Plan',
    name: 'plan-required',
    options: planOptions,
    required: true,
  },
};