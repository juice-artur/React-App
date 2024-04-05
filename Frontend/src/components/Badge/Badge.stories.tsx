
import { Story, Meta } from '@storybook/react';
import Badge, { BadgeProps } from './Badge';

export default {
  title: 'Components/Badge',
  component: Badge,
} as Meta;

const Template: Story<BadgeProps> = (args) => <Badge {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Badge',
};

export const CustomClassNames = Template.bind({});
CustomClassNames.args = {
  children:  'LOW',
  classNames: ['pl-2', 'pr-4', 'mt-4', 'py-2', 'text-secondary-600', 'bg-[#C5C5C5]', 'dark:text-secondary-400'],
};
