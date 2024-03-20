import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";


const Homepage = () => {
    return (
        <div style={{ display: "flex" }}>
            <DragDropContext onDragEnd={() => {}}>
                <Column columnId={0} /> 
                <Column columnId={1} />
            </DragDropContext>
        </div>
    );
}

export default Homepage;