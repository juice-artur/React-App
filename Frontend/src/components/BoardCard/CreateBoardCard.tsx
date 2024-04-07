import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import EditableTitle from "../EditableTitle/EditableTitle";
import { createBoard } from "../../utils/boardServer";
import { useDispatch } from "react-redux";
import Button from "../Button/Button";

interface CreateBoardProps {
    classNames?: string[];
}

const CreateBoardCard: React.FC<CreateBoardProps> = ({ classNames = [] }: CreateBoardProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setNewTitle] = useState("New board");
    const dispatch = useDispatch()
    const handleTitleChanged = (newTitle: string) => {
        setNewTitle(newTitle);
    };

    const onClose = () => {
        setNewTitle("New board");
        setIsEditing(false);
    }

    const handleCreateBoard = () => {
        dispatch(createBoard({ title: title }))
        onClose();
    };

    return (
        <div onClick={() => { }}
            className={`border-dashed border-4 border-gray-600 flex cursor-pointer rounded-lg w-64 h-32 m-8 justify-center bg-gray-300 ${classNames.join(' ')}`}
        >
            {
                !isEditing ?
                    <div className="flex items-center" onClick={() => setIsEditing(true)}>
                        <FaPlus className="mx-2" />
                        <h1>Add new board</h1>
                    </div> :

                    <div>
                        <div className="flex justify-center m-2">
                            <EditableTitle
                                initialTitle={title}
                                onSave={handleTitleChanged} />
                        </div>


                        <div className="h-24 m-8">
                            <div className="flex justify-end">
                                <Button
                                classNames={['mr-2']}
                                    variant="primary"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleCreateBoard();
                                    }}
                                >
                                    Create
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onClose();
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>

                    </div>
            }

        </div>
    )
};

export default CreateBoardCard;