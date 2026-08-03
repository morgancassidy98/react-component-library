import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CheckboxGroup } from './CheckboxGroup';

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

const notificationOptions = [
  { value: 'email',  label: 'Email',            helperText: 'Receive updates via email.' },
  { value: 'sms',    label: 'SMS',              helperText: 'Receive updates via text message.' },
  { value: 'push',   label: 'Push Notification', helperText: 'Receive updates via push notification.' },
  { value: 'mail',   label: 'Mail',             helperText: 'Receive updates via post.' },
];

const permissionOptions = [
  { value: 'read',   label: 'Read' },
  { value: 'write',  label: 'Write' },
  { value: 'delete', label: 'Delete', disabled: true },
  { value: 'admin',  label: 'Admin',  disabled: true },
];

const CheckboxGroupDemo = (args: any) => {
  const [values, setValues] = useState<string[]>([]);
  return <CheckboxGroup {...args} values={values} onChange={setValues} />;
};

export const Default: Story = {
  render: (args) => <CheckboxGroupDemo {...args} />,
  args: {
    legend: 'Notification Preferences',
    options: notificationOptions,
  },
};

export const WithSelectAll: Story = {
  render: (args) => <CheckboxGroupDemo {...args} />,
  args: {
    legend: 'Notification Preferences',
    options: notificationOptions,
    selectAll: true,
  },
};

export const WithError: Story = {
  render: (args) => <CheckboxGroupDemo {...args} />,
  args: {
    legend: 'Notification Preferences',
    options: notificationOptions,
    required: true,
    errorText: 'Please select at least one notification method.',
  },
};

export const WithDisabledOptions: Story = {
  render: (args) => <CheckboxGroupDemo {...args} />,
  args: {
    legend: 'Permissions',
    options: permissionOptions,
    selectAll: true,
  },
};

export const Disabled: Story = {
  render: (args) => <CheckboxGroupDemo {...args} />,
  args: {
    legend: 'Notification Preferences',
    options: notificationOptions,
    disabled: true,
  },
};

export const Required: Story = {
  render: (args) => <CheckboxGroupDemo {...args} />,
  args: {
    legend: 'Notification Preferences',
    options: notificationOptions,
    required: true,
  },
};