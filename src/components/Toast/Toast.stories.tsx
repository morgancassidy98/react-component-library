import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider } from './ToastContext';
import { ToastContainer } from './Toast'
import { useToast } from './useToast';
import { Button } from '../Button/Button';

const meta: Meta = {
  title: 'Components/Toast',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const ToastDemo = ({
  variant,
  message,
  title,
  duration,
}: {
  variant: 'success' | 'info' | 'warning' | 'danger';
  message: string;
  title?: string;
  duration?: number;
}) => {
  const { toast } = useToast();

  const handleClick = () => {
    toast[variant](message, { title, duration });
  };

  return (
    <Button variant="primary" onClick={handleClick}>
      Show {variant} toast
    </Button>
  );
};

const WithProvider = (Story: React.ComponentType) => (
  <ToastProvider>
    <Story />
    <ToastContainer />
  </ToastProvider>
);

export const Success: Story = {
  decorators: [WithProvider],
  render: () => (
    <ToastDemo
      variant="success"
      message="Your changes have been saved successfully."
      title="Saved"
    />
  ),
};

export const Info: Story = {
  decorators: [WithProvider],
  render: () => (
    <ToastDemo
      variant="info"
      message="A new version is available. Refresh to update."
      title="Update Available"
    />
  ),
};

export const Warning: Story = {
  decorators: [WithProvider],
  render: () => (
    <ToastDemo
      variant="warning"
      message="Your session will expire in 5 minutes."
      title="Session Expiring"
    />
  ),
};

export const Danger: Story = {
  decorators: [WithProvider],
  render: () => (
    <ToastDemo
      variant="danger"
      message="Failed to save changes. Please try again."
      title="Error"
    />
  ),
};

export const NoTitle: Story = {
  decorators: [WithProvider],
  render: () => (
    <ToastDemo
      variant="success"
      message="Profile updated successfully."
    />
  ),
};

export const LongDuration: Story = {
  decorators: [WithProvider],
  render: () => (
    <ToastDemo
      variant="info"
      message="This toast will stay visible for 8 seconds."
      title="Long Duration"
      duration={8000}
    />
  ),
};

export const MultipleToasts: Story = {
  decorators: [WithProvider],
  render: () => {
    const All = () => {
      const { toast } = useToast();
      return (
        <Button
          variant="primary"
          onClick={() => {
            toast.success('Changes saved successfully.');
            setTimeout(() => toast.info('New update available.'), 200);
            setTimeout(() => toast.warning('Session expiring soon.'), 400);
            setTimeout(() => toast.danger('Something went wrong.'), 600);
          }}
        >
          Show all toasts
        </Button>
      );
    };
    return <All />;
  },
};