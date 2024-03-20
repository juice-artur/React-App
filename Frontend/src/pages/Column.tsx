import { Droppable } from 'react-beautiful-dnd';

import { useSelector } from 'react-redux';
import { Task } from '../types/Task';
import Card from '../components/Card/Card';


const Column = ({ columnId }: { columnId: number }) => {
    const tasks = useSelector((state: any) => state.taskReducer.tasks);

    return (
        <Droppable key={columnId} droppableId={columnId.toString()}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <p>{"test"}</p>
            {tasks.filter((t:Task) => t.listId ===columnId).map((task: Task, index: number) => (
              <Card key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
}

export default Column;