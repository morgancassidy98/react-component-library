import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// Wrapper needed since Modal requires state
const ModalDemo = ({
  size = 'md',
  title = 'Confirm Action',
  closeOnBackdrop = true,
  children,
  footer,
}: {
  size?: 'sm' | 'md' | 'lg';
  title?: string;
  closeOnBackdrop?: boolean;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        size={size}
        closeOnBackdrop={closeOnBackdrop}
        footer={footer}
      >
        {children ?? (
          <p>
            This action is permanent and cannot be undone.
            Are you sure you want to proceed?
          </p>
        )}
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => <ModalDemo />,
};

export const Small: Story = {
  render: () => (
    <ModalDemo size="sm" title="Delete Record">
      <p>This record will be permanently deleted. This cannot be undone.</p>
    </ModalDemo>
  ),
};

export const Large: Story = {
  render: () => (
    <ModalDemo size="lg" title="Terms & Conditions">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
      ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
      <br />
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident.</p>
    </ModalDemo>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <ModalDemo
      title="Confirm Deletion"
      footer={
        <>
          <Button variant="ghost">Cancel</Button>
          <Button variant="danger">Delete</Button>
        </>
      }
    >
      <p>This record will be permanently deleted. This cannot be undone.</p>
    </ModalDemo>
  ),
};

export const WithForm: Story = {
  render: () => (
    <ModalDemo
      title="Edit Profile"
      size="md"
      footer={
        <>
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Save Changes</Button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Input label="Full Name" placeholder="Enter your name" fullWidth />
        <Input label="Email Address" type="email" placeholder="you@example.com" fullWidth />
        <Input label="Job Title" placeholder="Enter your title" fullWidth required />
      </div>
    </ModalDemo>
  ),
};

export const NoBackdropClose: Story = {
  render: () => (
    <ModalDemo
      title="Required Action"
      closeOnBackdrop={false}
      footer={
        <>
          <Button variant="primary">Acknowledge</Button>
        </>
      }
    >
      <p>You must acknowledge this notice before continuing.</p>
    </ModalDemo>
  ),
};