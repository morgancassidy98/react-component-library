import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'outlined', 'elevated'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card style={{ maxWidth: '400px' }}>
      <Card.Header>Card Title</Card.Header>
      <Card.Body>
        This is the card body. It can contain any content you need
        to display, including text, images, or other components.
      </Card.Body>
    </Card>
  ),
};

export const Outlined: Story = {
  render: () => (
    <Card variant="outlined" style={{ maxWidth: '400px' }}>
      <Card.Header>Outlined Card</Card.Header>
      <Card.Body>
        This card uses a stronger border with no shadow.
      </Card.Body>
    </Card>
  ),
};

export const Elevated: Story = {
  render: () => (
    <Card variant="elevated" style={{ maxWidth: '400px' }}>
      <Card.Header>Elevated Card</Card.Header>
      <Card.Body>
        This card uses a shadow instead of a border.
      </Card.Body>
    </Card>
  ),
};

export const WithDivider: Story = {
  render: () => (
    <Card style={{ maxWidth: '400px' }}>
      <Card.Header divider>Card Title</Card.Header>
      <Card.Body>
        The header has a divider separating it from the body content.
      </Card.Body>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card style={{ maxWidth: '400px' }}>
      <Card.Header divider>Confirm Action</Card.Header>
      <Card.Body>
        Are you sure you want to delete this record? This action
        cannot be undone.
      </Card.Body>
      <Card.Footer>
        <Button variant="ghost">Cancel</Button>
        <Button variant="danger">Delete</Button>
      </Card.Footer>
    </Card>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <Card style={{ maxWidth: '400px' }}>
      <Card.Header divider>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          Patient Record
          <Badge variant="success" shape="pill">Active</Badge>
        </div>
      </Card.Header>
      <Card.Body>
        Patient information and health record details would
        appear here in the card body.
      </Card.Body>
      <Card.Footer>
        <Button variant="outline" size="sm">View History</Button>
        <Button variant="primary" size="sm">Edit Record</Button>
      </Card.Footer>
    </Card>
  ),
};

export const Clickable: Story = {
  render: () => (
    <Card
      clickable
      style={{ maxWidth: '400px' }}
      onClick={() => alert('Card clicked')}
    >
      <Card.Header>Clickable Card</Card.Header>
      <Card.Body>
        This entire card is interactive. Click anywhere to trigger
        the action. Notice the lift effect on hover.
      </Card.Body>
    </Card>
  ),
};

export const Grid: Story = {
  render: () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '16px',
      maxWidth: '900px',
    }}>
      {['Research', 'Development', 'Design'].map((dept) => (
        <Card key={dept} variant="elevated" clickable>
          <Card.Header>{dept}</Card.Header>
          <Card.Body>
            Overview of the {dept.toLowerCase()} department
            and its current projects.
          </Card.Body>
          <Card.Footer>
            <Button variant="ghost" size="sm">Learn More</Button>
          </Card.Footer>
        </Card>
      ))}
    </div>
  ),
};