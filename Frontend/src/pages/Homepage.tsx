import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { ColumnData } from "../types/ColumnData";
import Column from "./Column";
import { patchTask } from "../actions/taskAction";
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

        // Check if the card was moved to a new location
        if (
            source.droppableId !== destination.droppableId ||
            source.index !== destination.index
        ) {

            console.log(draggableId);
            
            const task = tasks.find((t: Task) => t.id === parseInt(draggableId));
            if (task) {
                console.log(source)
                console.log(destination)
    
                dispatch(patchTask({
                    id: task.id,
                    listId: columns.filter((c: ColumnData) => c.title == destination.droppableId)[0].id ,
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