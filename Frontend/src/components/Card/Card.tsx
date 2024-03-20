import { Draggable } from "react-beautiful-dnd";
import { Task } from "../../types/Task";

const Card = ({ task, index }: { task: Task; index: number } ) => {
    return (
        <Draggable key={task.id.toString()} draggableId={task.id.toString()} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        marginTop: '20px',
                        ...provided.draggableProps.style, // Spread the draggableProps style
                        background: snapshot.isDragging ? "lightgreen" : "grey",
                    }}
                >
                    <div>
                        <p>{task.id}</p>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default Card;