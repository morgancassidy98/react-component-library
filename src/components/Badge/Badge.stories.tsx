import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary','secondary','danger','success','warning','ghost','outline'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    shape: {
      control: 'radio',
      options: ['rounded', 'pill', 'square'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Primary:   Story = { args: { variant: 'primary',   children: 'Primary'   } };
export const Secondary: Story = { args: { variant: 'secondary', children: 'Secondary' } };
export const Danger:    Story = { args: { variant: 'danger',    children: 'Danger'    } };
export const Success:   Story = { args: { variant: 'success',   children: 'Success'   } };
export const Warning:   Story = { args: { variant: 'warning',   children: 'Warning'   } };
export const Ghost:     Story = { args: { variant: 'ghost',     children: 'Ghost'     } };
export const Outline:   Story = { args: { variant: 'outline',   children: 'Outline'   } };

export const Small:  Story = { args: { size: 'sm', children: 'Small'  } };
export const Medium: Story = { args: { size: 'md', children: 'Medium' } };
export const Large:  Story = { args: { size: 'lg', children: 'Large'  } };

export const Rounded: Story = { args: { shape: 'rounded', children: 'Rounded' } };
export const Pill:    Story = { args: { shape: 'pill',    children: 'Pill'    } };
export const Square:  Story = { args: { shape: 'square',  children: 'Square'  } };