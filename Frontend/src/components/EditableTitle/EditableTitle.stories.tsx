import { Meta, StoryObj } from '@storybook/react';
import EditableTitle from './EditableTitle';
import { useState } from 'react';

const meta: Meta<typeof EditableTitle> = {
  component: EditableTitle,
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


