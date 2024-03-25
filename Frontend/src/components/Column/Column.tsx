import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { CreateTask, Task } from '../../types/Task';
import Card from '../Card/Card';
import { ColumnData } from '../../types/ColumnData';
import CreateCard from '../CreateCard/CreateCard';
import ReactDropdown from '../dropdown/ReactDropdown';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { FaTrashCan } from 'react-icons/fa6';
import { deleteColumn, patchColumn } from '../../utils/taskColumsServer';
import { useDispatch } from 'react-redux';
import {  FaEdit, FaPlus } from 'react-icons/fa';
import EditableTitle from '../EditableTitle/EditableTitle';
import { useState } from 'react';
import { CreateTaskModal } from '../ModalWindows/CreateTask/CreateTaskModal';
import { createTask } from '../../utils/tasksServer';

const Column = ({ columnData, index }: { columnData: ColumnData; index: number }) => {

    enum ColumnAction {
        DELETE,
        EDIT_TITLE,
        ADD_CARD,
      }

    const tasks = useSelector((state: any) => state.taskReducer.tasks);
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [focusInput, setFocusInput] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleCreateTask = (task: CreateTask) => {
        task.columnId = columnData.id;
        dispatch(createTask(task))
    };
    const dropdownItem = [
        { title: <div className='flex items-center'><FaEdit className='mr-2' /> Edit</div>, id: ColumnAction.EDIT_TITLE },
        { title: <div className='flex items-center'><FaPlus className='mr-2' /> Add new card</div>, id: ColumnAction.ADD_CARD },
        { title: <div className='text-red-800 flex items-center'><FaTrashCan className='mr-2' /> Delete</div>, id: ColumnAction.DELETE }
    ]
    const onSelect = (item: any) => {
        if (item.id == ColumnAction.DELETE) {
            dispatch(deleteColumn(columnData.id))
        }

        if(item.id == ColumnAction.ADD_CARD)
        {
            openModal();
        }

        if(item.id == ColumnAction.EDIT_TITLE)
        {
            setFocusInput(true);
            
        }
    }
    
    const handleTitleSave = (newTitle) => {
        setFocusInput(false)
        dispatch(patchColumn({ ...columnData, title: newTitle }));
    };





    return (
        <>
            <Draggable draggableId={columnData.title + columnData.id} index={index}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="w-80 min-h-100 border rounded sbg-gray-100 shadow-md m-2 flex flex-col"
                    >
                        <div
                            {...provided.dragHandleProps}
                            className="bg-gray-200 p-3 flex justify-between items-center border-b"
                        >
                            <EditableTitle
                                initialTitle={columnData.title}
                                onSave={handleTitleSave}
                                focusInput={focusInput}
                            />
                            <ReactDropdown options={dropdownItem} onSelect={(item: any) => onSelect(item)} > <BiDotsVerticalRounded /> </ReactDropdown>
                        </div>

                        <CreateCard classNames={["m-4", "relative", "h-16"]} columnId={columnData.id} />

                        <Droppable droppableId={columnData.title + columnData.id} key={index}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={`flex-1 p-4 overflow-y-auto ${snapshot.isDraggingOver ? 'bg-blue-100' : 'bg-gray-100'
                                        }`}
                                >
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


            <CreateTaskModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onCreateTask={handleCreateTask}
            />
        </>

    );
};

export default Column;
