import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { ColumnData } from "../types/ColumnData";
import Column from "./Column";
import { patchTask, patchTasks } from "../actions/taskAction";
import { Task } from "../types/Task";

const Homepage = () => {
    const dispatch = useDispatch();
    const columns = useSelector((state: any) => state.columnReducer.columns);
    const tasks = useSelector((state: any) => state.taskReducer.tasks);

    const onDragEnd = (result: DropResult) => {
        const { source, destination, draggableId } = result;

  
        if (!destination) {
            return;
        }

        if (
            source.droppableId === destination.droppableId &&
            source.index !== destination.index
        ) {
            console.log(source);
            console.log(draggableId);
            const newTasks: Task[]= [...tasks];
            const movedTask = newTasks.find((t: Task) => t.title+t.id === draggableId);
            console.log(movedTask);
            
            if (movedTask) {
                newTasks.splice(movedTask.id, 1);
                newTasks.splice(destination.index * (1 + movedTask.listId), 0, movedTask);
                dispatch(patchTasks(newTasks));
            }
        }


        // Check if the card was moved to a new location
        if (
            source.droppableId !== destination.droppableId 
        ) {

            console.log(draggableId);
            
            const task = tasks.find((t: Task) => t.title+t.id === draggableId);
            if (task) {
                console.log(source)
                console.log(destination)
    
                dispatch(patchTask({
                    id: task.id,
                    listId: columns.filter((c: ColumnData) => c.title+c.id == destination.droppableId)[0].id ,
                    title: task.title
                }));
            }
        }
    };

    return (
        <div style={{ display: "flex" }}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="board" type="COLUMN" direction="horizontal">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            style={{ display: "flex" }}
                        >
                            {columns.map((column: ColumnData, index: number) => (
                                <Column key={column.id} columnData={column} index={index} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default Homepage;