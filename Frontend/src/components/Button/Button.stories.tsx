import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button, { ButtonProps } from './Button';

export default {
  component: Button,
} as Meta;


const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary Button',
  onClick: (e) => action('clicked')(e),
  variant: "primary"
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Secondary Button',
  onClick: (e) => action('clicked')(e),
  variant: "secondary"
};
