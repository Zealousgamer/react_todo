import * as React from 'react';
import { Droppable } from 'react-beautiful-dnd';
const grid = 8;
const getListStyle = (isDraggingOver : any) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: '100%'
});
export default (props: any) =>
  <Droppable droppableId={props.droppableId}>
    {(provided: any, snapshot: any) => (
        <div className={props.className}
          ref={provided.innerRef} 
          {...provided.droppableProps}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          {provided.placeholder}
          {props.children}
        </div>
    )}
  </Droppable>