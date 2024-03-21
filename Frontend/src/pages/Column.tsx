import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { Task } from '../types/Task';
import Card from '../components/Card/Card';
import { ColumnData } from '../types/ColumnData';

const Column = ({ columnData, index }: { columnData: ColumnData; index: number }) => {
    const tasks = useSelector((state: any) => state.taskReducer.tasks);

    return (
        <Draggable draggableId={columnData.title+columnData.id} index={index}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps}>
                    <div {...provided.dragHandleProps}>
                        <p>{columnData.title}</p>
                    </div>
                    <Droppable droppableId={columnData.title+columnData.id} key={index}>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={{
                                    background: snapshot.isDraggingOver ? "lightblue" : "lightgrey",
                                    width: 200,
                                    padding: 15,
                                    marginRight: '20px'
                                }}
                            >
                                {tasks.filter((t: Task) => t.listId === columnData.id)
                                .sort((first:Task, second:Task)=> first.orderInList - second.orderInList)
                                .map((task: Task, index: number) => (
                                    <Card key={task.title} task={task} index={index} />
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