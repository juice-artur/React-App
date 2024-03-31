import { useEffect } from "react";
import { getAllBoards } from "../utils/boardServer";
import { useDispatch, useSelector } from "react-redux";
import { Board } from "../types/Board";
import CreateBoardCard from "../components/BoardCard/CreateBoardCard";
import BoardCard from "../components/BoardCard/BoardCard";



const Homepage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllBoards());
    }, [dispatch]);

    const boards: Board[] = useSelector((state: any) => state.boardReducer.boards);
    return (

        <div className="flex flex-wrap">

        <CreateBoardCard ></CreateBoardCard>
        {
            boards.map(
                (item: Board, index: number) => 
                (<BoardCard key={index} {...item}></BoardCard>)
            )
        }
        </div>
        
    );
};

export default Homepage;
