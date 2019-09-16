import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const grid = 8;

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "lightgrey",

  // styles we need to apply on draggables
  ...draggableStyle
});

export default (props: any) =>
  <Draggable draggableId={props.draggableId} index={props.index}>
    {(provided: any, snapshot: any) => (
      <div 
        className={props.className} 
        ref={provided.innerRef} 
        {...provided.draggableProps} 
        {...provided.dragHandleProps}
        style={getItemStyle(
          snapshot.isDragging,
          provided.draggableProps.style
        )}
      >
        {props.children}
      </div>
    )}
  </Draggable>