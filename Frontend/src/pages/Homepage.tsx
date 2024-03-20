import { DragDropContext } from "react-beautiful-dnd";
import Column from "../components/Column"; // Corrected import

const Homepage = () => {
    return (
        <div style={{ display: "flex" }}>
            <DragDropContext onDragEnd={() => {}}>
                <Column id={0} /> 
                <Column id={1} />
            </DragDropContext>
        </div>
    );
}

export default Homepage;