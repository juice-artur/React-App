import { Draggable } from "react-beautiful-dnd";
import { Task } from "../../types/Task";

const Card = ({ task, index }: { task: Task; index: number } ) => {
    return (
        <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
                <p>{task.title}</p>
            </div>
          )}
        </Draggable>
      );
};

export default Card;
