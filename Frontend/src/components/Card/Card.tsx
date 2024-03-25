import { Draggable } from "react-beautiful-dnd";
import { FaCalendar } from "react-icons/fa";
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { patchTask } from '../../utils/tasksServer';
import ReactDropdown from '../dropdown/ReactDropdown';
import { ColumnData } from '../../types/ColumnData';
import EditableTitle from '../EditableTitle/EditableTitle';


const Card = ({ task, index }) => {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.columnReducer.columns);

  const handleTitleSave = (newTitle) => {
    dispatch(patchTask({...task, title: newTitle}));
  };

  return (
    <Draggable key={task.title} draggableId={task.title + task.id} index={index}>
      {(provided) => (
        <div
          className="p-4 mb-4 rounded-lg bg-white shadow-md hover:shadow-lg border-l-4"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <EditableTitle
            initialTitle={task.title}
            onSave={handleTitleSave}
          />

          <p className="text-gray-600 text-sm">{task.description?.length > 100 ? `${task.description.slice(0, 100)}...` : task.description}</p>
          <div className="flex items-center mt-2">
            <FaCalendar className="text-gray-400 mr-2" />
            <p className="text-gray-400 text-xs">
              {moment(task.created_at).format("YYYY/MM/DD")}
            </p>
          </div>

          <ReactDropdown  classNames={['mt-2', "px-4" ,'border', 'border-gray-300', 'w-full']} options={columns} onSelect={(targetColumn: ColumnData)=> {
            dispatch(patchTask({...task, columnId: targetColumn.id}))
          }}>MOVE TO:  </ReactDropdown>
        </div>
      )}
    </Draggable>
  );
};

export default Card;