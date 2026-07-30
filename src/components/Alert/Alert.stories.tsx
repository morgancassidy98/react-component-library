import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger'],
    },
    live: {
      control: 'radio',
      options: ['polite', 'assertive', 'off'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Your session will expire in 10 minutes.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Your changes have been saved successfully.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'This action cannot be undone. Please proceed with caution.',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'An error occurred while processing your request.',
  },
};

export const WithTitle: Story = {
  args: {
    variant: 'info',
    title: 'Session Expiring',
    children: 'Your session will expire in 10 minutes. Save your work.',
  },
};

export const Dismissible: Story = {
  args: {
    variant: 'success',
    title: 'Changes Saved',
    children: 'Your profile has been updated successfully.',
    dismissible: true,
  },
};

export const Assertive: Story = {
  args: {
    variant: 'danger',
    title: 'Critical Error',
    children: 'Failed to submit form. Please try again.',
    live: 'assertive',
    dismissible: true,
  },
};