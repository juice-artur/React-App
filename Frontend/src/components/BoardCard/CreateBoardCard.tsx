import { FaPlus } from "react-icons/fa";

interface CreateBoardProps {
    classNames?: string[];
}

const CreateBoardCard: React.FC<CreateBoardProps> = ({ classNames = [] }: CreateBoardProps) => {

    return (
        <div onClick={() => { }}
            className={`border-dashed border-4 border-gray-600 flex cursor-pointer rounded-lg w-64 h-32 m-8 justify-center bg-gray-300 ${classNames.join(' ')}`}
        >

            <div className="flex items-center">
                <FaPlus className="mx-2" />
                <h1>Add new board</h1>
            </div>
        </div>
    )
};

export default CreateBoardCard;