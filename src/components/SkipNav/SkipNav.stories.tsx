import type { Meta, StoryObj } from '@storybook/react';
import { SkipNav } from './SkipNav';

const meta: Meta<typeof SkipNav> = {
  title: 'Components/SkipNav',
  component: SkipNav,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SkipNav>;

export const Default: Story = {
  render: () => (
    <div>
      <SkipNav targetId="main-content" />
      <p style={{
        fontFamily: 'sans-serif',
        fontSize: '13px',
        color: '#6b7280',
        marginBottom: '16px',
      }}>
        Tab into this preview to see the skip nav appear
      </p>
      <nav style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '24px',
        padding: '16px',
        background: '#f9fafb',
        borderRadius: '4px',
      }}>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Contact</a>
      </nav>
      <main id="main-content" style={{
        padding: '24px',
        border: '1px dashed #d1d5db',
        borderRadius: '4px',
        fontFamily: 'sans-serif',
        fontSize: '14px',
      }}>
        Main content starts here — this is where focus lands after activating the skip link.
      </main>
    </div>
  ),
};

export const CustomLabel: Story = {
  render: () => (
    <div>
      <SkipNav targetId="main-content" label="Skip to content" />
      <main id="main-content" style={{
        padding: '24px',
        border: '1px dashed #d1d5db',
        borderRadius: '4px',
        fontFamily: 'sans-serif',
        fontSize: '14px',
        marginTop: '16px',
      }}>
        Main content area
      </main>
    </div>
  ),
};