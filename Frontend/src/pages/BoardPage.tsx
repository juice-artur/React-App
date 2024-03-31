import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { ColumnData } from "../types/ColumnData";
import Column from "../components/Column/Column";
import { Task } from "../types/Task";
import { getAllTasks, patchTask } from "../utils/tasksServer";
import { useEffect } from "react";
import { getAllTaskColumnsByBoardId, patchColumn } from "../utils/taskColumsServer";
import { useParams } from "react-router-dom";



const BoardPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllTasks());
        dispatch(getAllTaskColumnsByBoardId(id));
    }, [dispatch]);


    const columns = useSelector((state: any) => state.columnReducer.columns);
    const tasks = useSelector((state: any) => state.taskReducer.tasks);
    const onDragEnd = (result: DropResult) => {
        const { source, destination, draggableId } = result;

        if (!destination) {
            return;
        }        
        if (result.type === 'COLUMN' && source.index !== destination.index) {

            const movedColumn = columns.find((c: ColumnData) => c.title + c.id === draggableId);
            let columnnsBefforeMove = [...columns].sort((first: ColumnData, second: ColumnData) => first.position - second.position)
            if (!movedColumn) {
                return;
            }

            let targetPosition = 0;

            if (destination.index === (columnnsBefforeMove.length - 1)) {
                targetPosition = columnnsBefforeMove[columnnsBefforeMove.length - 1].position + 500;
            }
            else if (destination.index == 0) {
                targetPosition = columnnsBefforeMove[0].position / 2;
            }
            else {
                targetPosition = (columnnsBefforeMove[destination.index - 1].position + columnnsBefforeMove[destination.index].position) / 2
            }

                const updatedColumn = { ...movedColumn, position: targetPosition };
                
                if (updatedColumn) {
                    dispatch(patchColumn(updatedColumn));
                    return;
                }
            } 

        else if (source.droppableId === destination.droppableId &&
            source.index !== destination.index) {
            const movedTask = tasks.find((t: Task) => t.title + t.id === draggableId);
            let columntasks = tasks.filter((t: Task) => t.columnId == movedTask.columnId).sort((f: Task, s: Task) =>  f.position -  s.position)

            let targetPosition = 0;
            if (columntasks.length == 0) {
                targetPosition = 1000;
            }
            else if (destination.index === (columntasks.length - 1)) {
                targetPosition = columntasks[columntasks.length - 1].position + 500;
            }
            else if (destination.index == 0) {
                targetPosition = columntasks[0].position / 2;
            }
            else {
                targetPosition = (columntasks[destination.index - 1].position + columntasks[destination.index].position) / 2
            }


            if (movedTask) {
                const updatedTask = { ...movedTask, position: targetPosition };

                if (updatedTask) {
                    dispatch(patchTask(updatedTask));
                }
            } else {
                console.error('Task not found or not an object');
            }
        }

        if (source.droppableId !== destination.droppableId) {
            let targetListid = columns.filter((c: ColumnData) => c.title+c.id == destination.droppableId)[0].id
            const movedTask = tasks.find((t: Task) => t.title + t.id === draggableId);
            let columntasks = tasks.filter((t: Task) => t.columnId == targetListid).sort((f: Task, s: Task) => f.position - s.position)
            let targetPosition = 0;
            
            if (columntasks.length == 0) {
                targetPosition = 1000;
            }
            else if (destination.index === (columntasks.length)) {
                targetPosition = columntasks[columntasks.length - 1].position + 500;
            }
            else if (destination.index == 0) {
                targetPosition = columntasks[0].position / 2;
            }
            else {                
                targetPosition = (columntasks[destination.index - 1].position + columntasks[destination.index].position) / 2
            }


            if (movedTask) {
                const updatedTask = { ...movedTask, position: targetPosition, columnId: targetListid };

                if (updatedTask) {
                    dispatch(patchTask(updatedTask));
                }
            } else {
                console.error('Task not found or not an object');
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
                            {
                                [...columns].sort((first: ColumnData, second: ColumnData) => first.position - second.position).map((column: ColumnData, index: number) => (
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

export default BoardPage;
