import { Droppable } from 'react-beautiful-dnd';
import Card from './Card/Card';



const Column = () =>
{
    return(
    <Droppable key={0} droppableId={`${0}`}>
         {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <Card id={0} createdAt={new Date()} />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
    )
}

export default Column;