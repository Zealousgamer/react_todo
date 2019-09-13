import * as React from 'react';
import { Droppable } from 'react-beautiful-dnd';

export default (props: any) =>
  <Droppable droppableId={props.droppableId}>
    {(provided: any) => (
        <div className={props.className} ref={provided.innerRef} {...provided.droppableProps}>
          {provided.placeholder}
          {props.children}
        </div>
    )}
  </Droppable>