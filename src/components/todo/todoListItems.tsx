import * as React from 'react';
import Todo from './todo';

interface IDraggableListItems {
  items: { task: string; id: number; status: Status; priority: string; }[]
}

enum Status {
    COMPLETE,
    INCOMPLETE
}
const TodoListItems: React.FC<IDraggableListItems> = (props) => {

  return (
    <div>
      {
        props.items.map((item, index) => {
          return <Todo key={`task_${item.id}`} task={item.task} id={item.id} status={item.status} priority={item.priority} position={index} />
        })
      } 
    </div>
  )
}
export default TodoListItems;