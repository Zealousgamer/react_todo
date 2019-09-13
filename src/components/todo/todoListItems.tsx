import * as React from 'react';
import Todo from './todo';

interface IDraggableListItems {
  items: { task: string; id: number; status: Status; priority: string}[]
}

enum Status {
    COMPLETE,
    INCOMPLETE
}

export default (props: IDraggableListItems) =>
  <div> {props.items.map(toTodo)} </div>


function toTodo(task: { task: string; id: number; status: Status; priority: string}) {
  return <Todo key={`task_${task.id}`} task={task.task} id={task.id} status={task.status} priority={task.priority} />
}