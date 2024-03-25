import { useState } from 'react';
import { Draggable } from "react-beautiful-dnd";
import { Task } from "../../types/Task";
import { FaCalendar } from "react-icons/fa";
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { patchTask } from '../../utils/tasksServer';
import ReactDropdown from '../dropdown/ReactDropdown';
import { ColumnData } from '../../types/ColumnData';

const Card = ({ task, index }: { task: Task; index: number }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const dispatch = useDispatch();
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const handleTitleSave = () => {
    setIsEditing(false);    
    dispatch(patchTask({...task, title: editedTitle}))
  };
  const columns = useSelector((state: any) => state.columnReducer.columns);
  return (
    <Draggable key={task.title} draggableId={task.title + task.id} index={index}>
      {(provided) => (
        <div
          className="p-4 mb-4 rounded-lg bg-white shadow-md hover:shadow-lg border-l-4"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={handleTitleChange}
              onBlur={handleTitleSave}
              autoFocus
              className="text-xl font-bold mb-2 outline-none border-b border-gray-400 "
              style={{ width: "100%" }}
            />
          ) : (
            <h3 className="text-xl font-bold mb-2 cursor-pointer" onClick={handleEdit}>
              {editedTitle}
            </h3>
          )}
          <p className="text-gray-600 text-sm">{task.description?.length > 100 ? `${task.description.slice(0, 100)}...` : task.description}</p>
          <div className="flex items-center mt-2">
            <FaCalendar className="text-gray-400 mr-2" />
            <p className="text-gray-400 text-xs">
              {moment(task.created_at).format("YYYY/MM/DD")}
            </p>
          </div>

          <ReactDropdown <ColumnData>  classNames={['mt-2']} options={columns} onSelect={(targetColumn: ColumnData)=> {
            dispatch(patchTask({...task, columnId: targetColumn.id}))
          }}> </ReactDropdown>
        </div>
      )}
    </Draggable>
  );
};

export default Card;