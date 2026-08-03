import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

const stateOptions = [
  { value: 'oh', label: 'Ohio' },
  { value: 'ky', label: 'Kentucky' },
  { value: 'in', label: 'Indiana' },
  { value: 'mi', label: 'Michigan' },
];

const roleOptions = [
  {
    group: 'Engineering',
    options: [
      { value: 'fe', label: 'Front-End Developer' },
      { value: 'be', label: 'Back-End Developer' },
      { value: 'fs', label: 'Full-Stack Developer' },
    ],
  },
  {
    group: 'Design',
    options: [
      { value: 'ux', label: 'UX Designer' },
      { value: 'ui', label: 'UI Designer' },
      { value: 'uxe', label: 'UX Engineer' },
    ],
  },
  {
    group: 'Product',
    options: [
      { value: 'pm', label: 'Product Manager' },
      { value: 'po', label: 'Product Owner' },
    ],
  },
];

const disabledOptions = [
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'archived', label: 'Archived', disabled: true },
  { value: 'deleted', label: 'Deleted', disabled: true },
];

export const Default: Story = {
  args: {
    label: 'State',
    options: stateOptions,
    placeholder: 'Select a state',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'State',
    options: stateOptions,
    placeholder: 'Select a state',
    helperText: 'Select the state where you currently reside.',
  },
};

export const Required: Story = {
  args: {
    label: 'State',
    options: stateOptions,
    placeholder: 'Select a state',
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'State',
    options: stateOptions,
    placeholder: 'Select a state',
    required: true,
    errorText: 'Please select a state to continue.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'State',
    options: stateOptions,
    placeholder: 'Select a state',
    disabled: true,
    helperText: 'This field is currently unavailable.',
  },
};

export const WithGroups: Story = {
  args: {
    label: 'Role',
    options: roleOptions,
    placeholder: 'Select a role',
  },
};

export const WithDisabledOptions: Story = {
  args: {
    label: 'Status',
    options: disabledOptions,
    placeholder: 'Select a status',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Role',
    options: roleOptions,
    placeholder: 'Select a role',
    fullWidth: true,
  },
};