import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { FaPlus } from "react-icons/fa";
import { CreateTaskModal } from "../ModalWindows/CreateTask/CreateTaskModal";
import { CreateTask } from "../../types/Task";
import { useDispatch } from "react-redux";
import { createTask } from "../../utils/tasksServer";

interface CreateCardProps {
    classNames?: string[];
    columnId: number;
}

const CreateCard: React.FC<CreateCardProps> = ({ classNames = [],  columnId} : CreateCardProps) => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {        
        setIsModalOpen(false);
    };

    const handleCreateTask = (task: CreateTask) => {
        task.columnId = columnId
        dispatch(createTask(task))
    };

    return (
        <Draggable key={"CreateCard"} draggableId={"CreateCard"} index={0} isDragDisabled={true}>
            {(provided) => (
                <div onClick={openModal}
                    className={`border-dashed border-2 border-gray-400 flex cursor-pointer ${classNames.join(' ')}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >

                    <div className="flex items-center">
                        <FaPlus className="mx-2" />
                        <h1>Add new card</h1>
                    </div>

                    <CreateTaskModal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        onCreateTask={handleCreateTask}
                    />
                </div>
            )}
        </Draggable>
    );
};

export default CreateCard;