import { Draggable } from "react-beautiful-dnd";
import { Task } from "../../types/Task";

const Card = (task : Task) => {
  return (
            <Draggable
              key={task.id}
              draggableId={task.id.toString()}
              index={task.id}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    ...provided.draggableProps.style,
                    background: snapshot.isDragging ? "lightgreen" : "white"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around"
                    }}
                  >
                    {task.id}
                  </div>
                </div>
              )}
            </Draggable>
  );
};

export default Card;
