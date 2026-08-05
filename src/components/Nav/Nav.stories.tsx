import type { Meta, StoryObj } from '@storybook/react';
import { Nav } from './Nav';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';
import { SkipNav } from '../SkipNav/SkipNav';

const meta: Meta<typeof Nav> = {
  title: 'Components/Nav',
  component: Nav,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Nav>;

const NavLinks = ({ active = 'home' }: { active?: string }) => (
  <Nav.Items>
    <Nav.Item href="/" active={active === 'home'}>Home</Nav.Item>
    <Nav.Item href="/components" active={active === 'components'}>Components</Nav.Item>
    <Nav.Item href="/docs" active={active === 'docs'}>Documentation</Nav.Item>
    <Nav.Item href="/about" active={active === 'about'}>About</Nav.Item>
  </Nav.Items>
);

export const Default: Story = {
  render: () => (
    <>
      <SkipNav targetId="main-content" />
      <Nav>
        <Nav.Brand href="/">Cassidy UI</Nav.Brand>
        <NavLinks active="home" />
        <Nav.Actions>
          <Button variant="outline" size="sm">Sign In</Button>
          <Button variant="primary" size="sm">Get Started</Button>
        </Nav.Actions>
      </Nav>
      <main id="main-content" style={{ padding: '40px 24px' }}>
        <p style={{ fontFamily: 'sans-serif', color: '#6b7280' }}>
          Tab to the top of the page to see the SkipNav in action.
        </p>
      </main>
    </>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <Nav>
      <Nav.Brand href="/">Cassidy UI</Nav.Brand>
      <NavLinks active="home" />
      <Nav.Actions>
        <Badge variant="danger" shape="pill">3 Alerts</Badge>
        <Button variant="primary" size="sm">Get Started</Button>
      </Nav.Actions>
    </Nav>
  ),
};

export const MinimalNav: Story = {
  render: () => (
    <Nav>
      <Nav.Brand href="/">Cassidy UI</Nav.Brand>
      <NavLinks active="home" />
    </Nav>
  ),
};

export const WithDisabledItem: Story = {
  render: () => (
    <Nav>
      <Nav.Brand href="/">Cassidy UI</Nav.Brand>
      <Nav.Items>
        <Nav.Item href="/" active>Home</Nav.Item>
        <Nav.Item href="/components">Components</Nav.Item>
        <Nav.Item href="/docs" disabled>Documentation</Nav.Item>
        <Nav.Item href="/about">About</Nav.Item>
      </Nav.Items>
      <Nav.Actions>
        <Button variant="primary" size="sm">Get Started</Button>
      </Nav.Actions>
    </Nav>
  ),
};