import { useNavigate } from "react-router-dom";
import { Board } from "../../types/Board";

const BoardCard: React.FC<Board> = (props: Board) => {
    const navigate = useNavigate();
    return (
        
        <div onClick={() => {navigate(`board/${props.id}`) }}
            className={`border-dashed border-4 border-gray-600 flex cursor-pointer rounded-lg w-64 h-32 m-8 justify-center bg-gray-300`}
        >
            <div className="flex items-center">
                <h1>{props.title}</h1>
            </div>
        </div>
    )
};

export default BoardCard;