import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { Badge } from '../Badge/Badge';
import { Alert } from '../Alert/Alert';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['line', 'pill', 'bordered'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Line: Story = {
  render: () => (
    <Tabs defaultTab="overview" variant="line">
      <Tabs.List>
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="details">Details</Tabs.Tab>
        <Tabs.Tab value="history">History</Tabs.Tab>
        <Tabs.Tab value="archived" disabled>Archived</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="overview">
        Overview content goes here. This is the default active tab.
      </Tabs.Panel>
      <Tabs.Panel value="details">
        Detailed information about this record.
      </Tabs.Panel>
      <Tabs.Panel value="history">
        Historical data and audit trail.
      </Tabs.Panel>
      <Tabs.Panel value="archived">
        Archived content — this tab is disabled.
      </Tabs.Panel>
    </Tabs>
  ),
};

export const Pill: Story = {
  render: () => (
    <Tabs defaultTab="overview" variant="pill">
      <Tabs.List>
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="details">Details</Tabs.Tab>
        <Tabs.Tab value="history">History</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="overview">
        Overview content goes here.
      </Tabs.Panel>
      <Tabs.Panel value="details">
        Detailed information about this record.
      </Tabs.Panel>
      <Tabs.Panel value="history">
        Historical data and audit trail.
      </Tabs.Panel>
    </Tabs>
  ),
};

export const Bordered: Story = {
  render: () => (
    <Tabs defaultTab="overview" variant="bordered">
      <Tabs.List>
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="details">Details</Tabs.Tab>
        <Tabs.Tab value="history">History</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="overview">
        Overview content goes here.
      </Tabs.Panel>
      <Tabs.Panel value="details">
        Detailed information about this record.
      </Tabs.Panel>
      <Tabs.Panel value="history">
        Historical data and audit trail.
      </Tabs.Panel>
    </Tabs>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <Tabs defaultTab="active" variant="line">
      <Tabs.List>
        <Tabs.Tab value="active">
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            Active
            <Badge variant="success" shape="pill">12</Badge>
          </span>
        </Tabs.Tab>
        <Tabs.Tab value="pending">
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            Pending
            <Badge variant="warning" shape="pill">3</Badge>
          </span>
        </Tabs.Tab>
        <Tabs.Tab value="closed">
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            Closed
            <Badge variant="secondary" shape="pill">28</Badge>
          </span>
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="active">
        <Alert variant="success">
          12 active records found.
        </Alert>
      </Tabs.Panel>
      <Tabs.Panel value="pending">
        <Alert variant="warning">
          3 records pending review.
        </Alert>
      </Tabs.Panel>
      <Tabs.Panel value="closed">
        <Alert variant="info">
          28 closed records in the archive.
        </Alert>
      </Tabs.Panel>
    </Tabs>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Tabs defaultTab="personal" variant="line">
      <Tabs.List>
        <Tabs.Tab value="personal">Personal</Tabs.Tab>
        <Tabs.Tab value="contact">Contact</Tabs.Tab>
        <Tabs.Tab value="preferences">Preferences</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="personal">
        <div className="form-stack">
          <div className="form-row">
            <Input label="First Name" placeholder="Enter first name" fullWidth />
            <Input label="Last Name" placeholder="Enter last name" fullWidth />
          </div>
          <Input label="Job Title" placeholder="Enter job title" fullWidth />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="primary">Save Changes</Button>
          </div>
        </div>
      </Tabs.Panel>
      <Tabs.Panel value="contact">
        <div className="form-stack">
          <Input label="Email Address" type="email" placeholder="you@example.com" fullWidth />
          <Input label="Phone Number" type="tel" placeholder="(555) 000-0000" fullWidth />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="primary">Save Changes</Button>
          </div>
        </div>
      </Tabs.Panel>
      <Tabs.Panel value="preferences">
        <div className="form-stack">
          <Input label="Language" placeholder="English" fullWidth />
          <Input label="Timezone" placeholder="EST" fullWidth />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="primary">Save Changes</Button>
          </div>
        </div>
      </Tabs.Panel>
    </Tabs>
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <Tabs defaultTab="overview" variant="pill">
      <Tabs.List>
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="details">Details</Tabs.Tab>
        <Tabs.Tab value="restricted" disabled>Restricted</Tabs.Tab>
        <Tabs.Tab value="archived" disabled>Archived</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="overview">
        Overview content goes here.
      </Tabs.Panel>
      <Tabs.Panel value="details">
        Detailed information about this record.
      </Tabs.Panel>
      <Tabs.Panel value="restricted">
        Restricted content.
      </Tabs.Panel>
      <Tabs.Panel value="archived">
        Archived content.
      </Tabs.Panel>
    </Tabs>
  ),
};