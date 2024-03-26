import { Draggable } from "react-beautiful-dnd";
import { FaCalendar, FaEdit } from "react-icons/fa";
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, patchTask } from '../../utils/tasksServer';
import ReactDropdown from '../dropdown/ReactDropdown';
import { ColumnData } from '../../types/ColumnData';
import EditableTitle from '../EditableTitle/EditableTitle';
import { FaTrashCan } from "react-icons/fa6";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Badge from "../Badge/Badge";
import { GoDotFill } from "react-icons/go";
import { EditTaskModalWindow } from "../EditTaskModalWindow/EditTaskModalWindow";
import { useState } from "react";


const Card = ({ task, index }) => {

  enum CardAction {
    DELETE,
    EDIT,
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {        
        setIsModalOpen(false);
    };

    const handleEditTask = (t: Task) => {
        dispatch(patchTask({...t, columnId:  task.columnId} ))
    };

  const columns = useSelector((state) => state.columnReducer.columns);

  const handleTitleSave = (newTitle) => {
    dispatch(patchTask({ ...task, title: newTitle }));
  };

  const dropdownItem = [
    { title: <div className='flex items-center'><FaEdit className='mr-2' /> Edit</div>, id: CardAction.EDIT },
    { title: <div className='text-red-800 flex items-center'><FaTrashCan className='mr-2' /> Delete</div>, id: CardAction.DELETE }
  ]

  const onSelect = (item: any) => {
    if (item.id == CardAction.DELETE) {
      dispatch(deleteTask(task.id))
    }

    if (item.id == CardAction.EDIT) {
      dispatch(openModal());
    }
  }

  return (
    <Draggable key={task.title} draggableId={task.title + task.id} index={index}>
      {(provided) => (
        <div
          className="p-4 mb-4 rounded-lg bg-white shadow-md hover:shadow-lg border-l-4"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >

          <div
            {...provided.dragHandleProps}
            className="bg-gray-200 p-3 flex justify-between items-center border-b"
          >
            <EditableTitle
              initialTitle={task.title}
              onSave={handleTitleSave}
            />
            <ReactDropdown options={dropdownItem} onSelect={(item: any) => onSelect(item)} > <BiDotsVerticalRounded /> </ReactDropdown>
          </div>

          <p className="text-gray-600 text-sm">{task.description?.length > 100 ? `${task.description.slice(0, 100)}...` : task.description}</p>
          <div className="flex items-center mt-2">
            <FaCalendar className="text-gray-400 mr-2" />
            <p className="text-gray-400 text-xs">
              {moment(task.due_date).format("YYYY/MM/DD")}
            </p>
          </div>

          <Badge classNames={['pl-2 pr-4 mt-4 py-2 text-secondary-600 bg-[#C5C5C5] dark:text-secondary-400']}>
            <div className="flex items-center">
              <GoDotFill /> {task.priority}
            </div>
          </Badge>


          <ReactDropdown classNames={['mt-2', "px-4", 'border', 'border-gray-300', 'w-full']} options={columns} onSelect={(targetColumn: ColumnData) => {
            dispatch(patchTask({ ...task, columnId: targetColumn.id }))
          }}>MOVE TO:  </ReactDropdown>




          <EditTaskModalWindow
            isOpen={isModalOpen}
            onClose={closeModal}
            onEditTask={handleEditTask} 
            task={task}          />

        </div>
      )}
    </Draggable>
  );
};

export default Card;