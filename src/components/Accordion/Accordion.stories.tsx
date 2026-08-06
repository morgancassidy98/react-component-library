import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';
import { Alert } from '../Alert/Alert';
import { Badge } from '../Badge/Badge';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'radio',
      options: ['single', 'multiple'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion defaultOpen="item1">
      <Accordion.Item value="item1">
        <Accordion.Trigger>What is CMT UI?</Accordion.Trigger>
        <Accordion.Panel>
          CMT UI is an accessible React component library built with
          TypeScript. Every component is designed to meet WCAG 2.1 AA
          and Section 508 requirements.
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="item2">
        <Accordion.Trigger>How do I install it?</Accordion.Trigger>
        <Accordion.Panel>
          Clone the repository, run npm install, and import components
          directly from their source files. Full installation instructions
          are in the README.
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="item3">
        <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
        <Accordion.Panel>
          Yes — every component meets WCAG 2.1 AA standards. The accordion
          uses aria-expanded, aria-controls, and role="region" with
          aria-labelledby for full screen reader support.
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion mode="multiple" defaultOpen={['item1', 'item2']}>
      <Accordion.Item value="item1">
        <Accordion.Trigger>Overview</Accordion.Trigger>
        <Accordion.Panel>
          Overview content — multiple mode allows this to stay open
          while other panels are also open.
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="item2">
        <Accordion.Trigger>Details</Accordion.Trigger>
        <Accordion.Panel>
          Detailed content — also open by default in this story.
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="item3">
        <Accordion.Trigger>History</Accordion.Trigger>
        <Accordion.Panel>
          Historical data and audit trail information.
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <Accordion defaultOpen="item1">
      <Accordion.Item value="item1">
        <Accordion.Trigger>Available Section</Accordion.Trigger>
        <Accordion.Panel>
          This section is available and can be expanded.
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="item2" disabled>
        <Accordion.Trigger>Restricted Section</Accordion.Trigger>
        <Accordion.Panel>
          This content is restricted.
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="item3">
        <Accordion.Trigger>Another Section</Accordion.Trigger>
        <Accordion.Panel>
          This section is also available.
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  ),
};

export const WithAlert: Story = {
  render: () => (
    <Accordion defaultOpen="item1">
      <Accordion.Item value="item1">
        <Accordion.Trigger>Program Eligibility</Accordion.Trigger>
        <Accordion.Panel>
          <Alert variant="info">
            You must meet all eligibility requirements before applying
            to this program.
          </Alert>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="item2">
        <Accordion.Trigger>Required Documents</Accordion.Trigger>
        <Accordion.Panel>
          <Alert variant="warning">
            All documents must be submitted within 30 days of your
            application date.
          </Alert>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="item3">
        <Accordion.Trigger>Contact Information</Accordion.Trigger>
        <Accordion.Panel>
          For questions about your application, contact the program
          office at 1-800-555-0100 between 9am and 5pm EST.
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <Accordion mode="multiple">
      <Accordion.Item value="active">
        <Accordion.Trigger>
          <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            Active Records
            <Badge variant="success" shape="pill">12</Badge>
          </span>
        </Accordion.Trigger>
        <Accordion.Panel>
          12 active records are currently being processed.
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="pending">
        <Accordion.Trigger>
          <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            Pending Review
            <Badge variant="warning" shape="pill">3</Badge>
          </span>
        </Accordion.Trigger>
        <Accordion.Panel>
          3 records are awaiting review from a program administrator.
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="closed">
        <Accordion.Trigger>
          <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            Closed
            <Badge variant="secondary" shape="pill">28</Badge>
          </span>
        </Accordion.Trigger>
        <Accordion.Panel>
          28 records have been closed and archived.
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  ),
};