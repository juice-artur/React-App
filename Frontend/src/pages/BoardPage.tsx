import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { ColumnData } from "../types/ColumnData";
import Column from "../components/Column/Column";
import { Task } from "../types/Task";
import { getAllTasks, patchTask } from "../utils/tasksServer";
import { useEffect, useState } from "react";
import { getAllTaskColumnsByBoardId, patchColumn } from "../utils/taskColumsServer";
import { useParams } from "react-router-dom";
import { FaHistory } from "react-icons/fa";
import { HistoryOfChangesBoard } from "../types/Board";
import axios from "axios";
import Sidebar from "../components/Sidebar/Sidebar";



const BoardPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [history, setHistory] = useState<HistoryOfChangesBoard[]>([]);


    const fetchData = async (id: number) => {
        try {
            const baseurl = import.meta.env.VITE_API_BASE_URL
            const response = await axios.get(`${baseurl}/history-of-changes-board/find-all-by-board-id/${id}`);
            setHistory(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const columns = useSelector((state: any) => state.columnReducer.columns);
    const tasks = useSelector((state: any) => state.taskReducer.tasks);

    useEffect(() => {
        dispatch(getAllTasks());
        dispatch(getAllTaskColumnsByBoardId(id));
        fetchData(Number(id));
    }, [columns]);

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
            let columntasks = tasks.filter((t: Task) => t.columnId == movedTask.columnId).sort((f: Task, s: Task) => f.position - s.position)

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
            let targetListid = columns.filter((c: ColumnData) => c.title + c.id == destination.droppableId)[0].id
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

    const [showSidebar, setShowSidebar] = useState(false);
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <>
            <button className="float-right mx-4 my-2 z-40" onClick={toggleSidebar}><FaHistory /></button>
            <div className="my-8" style={{ display: "flex" }}>

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

                {showSidebar && <Sidebar history={history} toggleSidebar={toggleSidebar} />}
            </div>
        </>

    );
};

export default BoardPage;
