import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "./Column";

const Homepage = () => {
    return (
        <div style={{ display: "flex" }}>
            <DragDropContext onDragEnd={() => {}}>
                <Droppable
                    droppableId="board"
                    type="COLUMN"
                    direction="horizontal"
                >
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            style={{ display: "flex" }}
                        >
                            <Column columnId={0} />
                            <Column columnId={1} />
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}

export default Homepage;