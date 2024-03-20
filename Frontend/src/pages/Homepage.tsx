import { DragDropContext } from "react-beautiful-dnd";
import Colum from "../components/Colum";

const Homepage = () =>
{
    return(<div>
        <DragDropContext onDragEnd={()=> {}}>
            <Colum/>
            <Colum/>
        </DragDropContext>
    </div>)
}

export default Homepage;