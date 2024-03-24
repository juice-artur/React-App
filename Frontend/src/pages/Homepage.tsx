import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { ColumnData } from "../types/ColumnData";
import Column from "./Column";
import { Task } from "../types/Task";
import { patchColumn } from "../actions/columnAction";
import { getAllTasks, patchTask } from "../utils/tasksServer";
import { useEffect } from "react";



const Homepage = () => {
    const dispatch = useDispatch();
     
    useEffect(() => {
        dispatch(getAllTasks());
    }, [dispatch]); 

    
    const columns = useSelector((state: any) => state.columnReducer.columns);
    const tasks = useSelector((state: any) => state.taskReducer.tasks);
    const onDragEnd = (result: DropResult) => {
        const { source, destination, draggableId } = result;
  
        if (!destination) {
            return;
        }
        if (result.type === 'COLUMN' && source.index !== destination.index) {

            const movedColumn = columns.find((c: ColumnData) => c.title+c.id === draggableId);
            if (!movedColumn) {
                return;
            }
        
            const newColumns = columns.map((col: ColumnData) => {
                if (col.id === movedColumn.id) {
                    return { ...col, columnPosition: destination.index };
                } 
                else if(col.columnPosition <=  destination.index && col.columnPosition >= source.index)
                {
                    return { ...col, columnPosition: col.columnPosition - 1 };
                }
                else if (col.columnPosition >= destination.index && col.columnPosition <= source.index) {
                    return { ...col, columnPosition: col.columnPosition + 1 };
                }
                return col;
            });
        
            dispatch(patchColumn([...newColumns]));
            return;          
        }

        if (source.droppableId === destination.droppableId &&
            source.index !== destination.index ) { 
                const movedTask = tasks.find((t: Task) => t.title + t.id === draggableId);
                let columntasks = tasks.filter((t:Task) => t.columnId == movedTask.columnId).sort((f: Task, s: Task) => f.position -s.position)

                let targetPosition = 0;
                if(columntasks.length == 0)
                {
                    targetPosition =1000;
                }
                console.log(destination.index);
                console.log(columntasks.length);
                console.log(destination.index === (columntasks.length - 1));
                
                
                if(destination.index === (columntasks.length - 1))
                {
                    targetPosition = columntasks[ columntasks.length - 1].position + 500;
                }
                else if(destination.index == 0)
                {
                    targetPosition = columntasks[0].position  / 2;
                }
                else
                {
                    targetPosition = (columntasks[destination.index - 1].position + columntasks[destination.index + 1].position) / 2
                }


                if (movedTask ) {
                    const updatedTask = { ...movedTask, position: targetPosition };
                    console.log(updatedTask);
                    
                    if (updatedTask) {
                        dispatch(patchTask(updatedTask));
                    }
                    console.log(updatedTask);
                } else {
                    console.error('Task not found or not an object');
                }
            

        }

        if (source.droppableId !== destination.droppableId ) {
            const movedTask = tasks.find((t: Task) => t.title+t.id === draggableId);
            const newTasks = tasks.map((task: Task) => {
                if (task.id === movedTask.id) {
                    return { ...task, position: destination.index, 
                        listId: columns.filter((c: ColumnData) => c.title+c.id == destination.droppableId)[0].id 
                    };
                }
                else
                {
                    const destColumnId: number = columns.filter((c: ColumnData) => c.title+c.id == destination.droppableId)[0].id
                    
                    if(task.columnId == destColumnId)
                    {
                        if (task.position >= destination.index) {                    
                            return { ...task, position: task.position + 1 };
                        }
                        return task;
                    }
                    else if(task.columnId != destColumnId) 
                    {
                        if (task.position > source.index) {                    
                            return { ...task, position: task.position - 1 };
                        }
                        return task
                    }
                }

                return task;
            });
            if (movedTask) {
                dispatch(patchTask(...newTask));
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
                            [...columns].sort((first: ColumnData, second: ColumnData) => first.columnPosition -second.columnPosition).map((column: ColumnData, index: number) => (
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
