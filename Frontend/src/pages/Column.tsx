import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { Task } from '../types/Task';
import Card from '../components/Card/Card';

const Column = ({ columnId }: { columnId: number }) => {
    const tasks = useSelector((state: any) => state.taskReducer.tasks);

    return (
        <Draggable draggableId={columnId.toString()} index={columnId}>
            {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.draggableProps}>
                    <div {...provided.dragHandleProps}>
                        {/* Drag handle content */}
                    </div>
                    <Droppable droppableId={columnId.toString()} key={columnId}>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={{
                                    background: snapshot.isDraggingOver ? "lightblue" : "lightgrey",
                                    width: 200,
                                    padding: 8,
                                    marginRight: '20px'
                                }}
                            >
                                <p>{"test"}</p>
                                {tasks.filter((t: Task) => t.listId === columnId).map((task: Task, index: number) => (
                                    <Card key={task.id} task={task} index={index} />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    );
}

export default Column;