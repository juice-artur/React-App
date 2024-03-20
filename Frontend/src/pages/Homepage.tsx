import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { ColumnData } from "../types/ColumnData";
import Column from "./Column";

const Homepage = () => {
    const columns = useSelector((state: any) => state.columnReducer.columns);
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
                            {columns.map((column: ColumnData, index: number) => (
                                <Column key={column.id} columnData={column} index={index} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}

export default Homepage;