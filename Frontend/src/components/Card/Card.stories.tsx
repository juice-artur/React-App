import { Meta, StoryObj } from '@storybook/react';
import Card from './Card';
import EditableTitle from '../EditableTitle/EditableTitle';
import { useState } from 'react';

const meta: Meta<typeof Card> = {
  component: Card,
};

export default meta;

export const Primary: StoryObj = {
  args: {
    initialTitle: 'Editable title example',
  },
  
  argTypes: {
    initialTitle: {
      control: { type: 'text' }, 
    },
  },

  render: ({ initialTitle }) => {
    const [title, setTitle] = useState(initialTitle);

    const handleSave = (newTitle: string) => {
      setTitle(newTitle);
    };

    return (
      <EditableTitle initialTitle={title} onSave={handleSave} />
    );
  },
};