import { useNavigate } from "react-router-dom";
import { Board } from "../../types/Board";
import EditableTitle from "../EditableTitle/EditableTitle.tsx";
import { deleteBoard, patchBoard } from "../../utils/boardServer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import ReactDropdown from "../dropdown/ReactDropdown";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { BiDotsVerticalRounded } from "react-icons/bi";

const BoardCard: React.FC<Board> = (props: Board) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [focusInput, setFocusInput] = useState(false);

    enum ColumnAction {
        DELETE,
        EDIT_TITLE,
      }

    const dropdownItem = [
        { title: <div className='flex items-center'><FaEdit className='mr-2' /> Edit</div>, id: ColumnAction.EDIT_TITLE },
        { title: <div className='text-red-800 flex items-center'><FaTrashCan className='mr-2' /> Delete</div>, id: ColumnAction.DELETE }
    ]

    const onSelect = (item: any) => {
        
        if (item.id == ColumnAction.DELETE) {
            
           dispatch(deleteBoard(props.id))
        }

        if(item.id == ColumnAction.EDIT_TITLE)
        {
            setFocusInput(true); 
        }
    }

    const handleTitleSave = (newTitle: string) => {
        dispatch(patchBoard({...props, title: newTitle}));
        setFocusInput(false)
      };

    return (
        <div 
            className={`border-dashed border-4 border-gray-600 flex flex-wrap cursor-pointer rounded-lg w-64 h-32 m-8 bg-gray-300`}
        >
            <div className="float-right w-full max-h-min">
                <ReactDropdown classNames={['float-right']} options={dropdownItem} onSelect={(item: any) => onSelect(item)} > <BiDotsVerticalRounded /> </ReactDropdown>
            </div>
            <div onClick={() => { navigate(`board/${props.id}`) }} className="flex items-center w-full">
                <div className="flex justify-center m-2 w-full">
                    <EditableTitle 

                        initialTitle={props.title}
                        focusInput= {focusInput}
                        onSave={handleTitleSave} />
                </div>
            </div>
        </div>
    )
};

export default BoardCard;