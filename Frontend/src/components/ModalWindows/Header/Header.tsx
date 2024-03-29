import { FaPlus } from "react-icons/fa";
import { CreateTaskListModal } from "../CreateTaskList/CreateTaskList";
import { useState } from "react";
import { CreateColumnData } from "../../../types/ColumnData";
import { createColumn } from "../../../utils/taskColumsServer";
import { useDispatch } from "react-redux";

interface HeaderProps {
    classNames?: string[];
    title: string
}


const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleCreateTaskList = (createdTaskList: CreateColumnData) =>
    {
        dispatch(createColumn(createdTaskList))
    }

    return (
        <>

            <header className="bg-gray-800 text-white py-4 px-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-2xl font-bold">{props.title}</div>
                    <div className="flex cursor-pointer" onClick={() => {openModal() }}>
                        <FaPlus className="mx-2 my-1" />
                        <p>Create new list</p>
                    </div>
                </div>
            </header>
            <CreateTaskListModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onCreateList={handleCreateTaskList}
            />
        </>



    );
};

export default Header;