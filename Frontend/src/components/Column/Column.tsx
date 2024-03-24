import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { Task } from '../../types/Task';
import Card from '../Card/Card';
import { ColumnData } from '../../types/ColumnData';
import CreateCard from '../CreateCard/CreateCard';

const Column = ({ columnData, index }: { columnData: ColumnData; index: number }) => {
    const tasks = useSelector((state: any) => state.taskReducer.tasks);

    return (
        <Draggable draggableId={columnData.title + columnData.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="w-80 min-h-100 border rounded bg-white shadow-md m-2 flex flex-col"
                >
                    <div
                        {...provided.dragHandleProps}
                        className="bg-gray-200 p-3 flex justify-between items-center border-b"
                    >
                        <p className="font-semibold">{columnData.title}</p>
                    </div>
                    <Droppable droppableId={columnData.title + columnData.id} key={index}>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={`flex-1 p-4 overflow-y-auto ${
                                    snapshot.isDraggingOver ? 'bg-blue-100' : 'bg-gray-100'
                                }`}
                            >
                                <CreateCard classNames={["mb-4", "relative", "h-16"]}/>

                                {tasks
                                    .filter((t: Task) => t.columnId === columnData.id)
                                    .sort((first: Task, second: Task) => first.position - second.position)
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
};

export default Column;