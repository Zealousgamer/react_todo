import React from 'react';
import useGlobal from "./store/index";
import './App.css';
import DroppableWrapper from './components/drag_and_drop/DroppableWrapper';
import DraggableListItems from './components/todo/todoListItems';
import TodoContext from './components/drag_and_drop/TodoContext'
import ActionBar from './components/actionBar/actionBar';
import EnterBar from './components/enterBar/enterBar';

interface Tasks {
  id: number,
  task: string,
  status: Status,
  priority: string,
  position: number
}

enum Status {
  COMPLETE,
  INCOMPLETE
}

enum Display {
  ALL,
  COMPLETE,
  INCOMPLETE
}

const App: React.FC = () => {
  const [globalState, globalActions] = useGlobal();

  const allTasks: Tasks[]= globalState.tasks;
  const completeTasks: Tasks[] = allTasks.filter(task => task.status !== Status.INCOMPLETE);
  const incompleteTasks: Tasks[] = allTasks.filter(task => task.status !== Status.COMPLETE);
  const priority: string = globalState.priority;

  const onDragEnd = (result: any) => {
    const { destination, source } = result;
  
    if (!destination) { return }
    const allTasks: Tasks[] = globalState.tasks;
    const taskToMove: Tasks = allTasks[source.index]
    allTasks.splice(source.index, 1);
    allTasks.splice(destination.index, 0, taskToMove);
    globalActions.setTasks(allTasks);
  }

  
  let renderTasks: Tasks[];

  if (globalState.display === Display.COMPLETE){
    renderTasks = completeTasks;
  } else if (globalState.display === Display.INCOMPLETE) {
    renderTasks = incompleteTasks;
  } else {
    renderTasks = allTasks;
  }

  return (
    <div className="App">
      <EnterBar placeholder='Enter Task...'></EnterBar>
      //@ts-ignore
      <TodoContext onDragEnd={onDragEnd}>
        <DroppableWrapper droppableId={1} className="source">
          <DraggableListItems items={renderTasks.filter((task: { task: string | undefined; id: number; status: Status; priority: string}) => {
          if(priority === 'all') {
            return task;
          }
          return task.priority === priority
        })} />
        </DroppableWrapper>
      </TodoContext>
      <ActionBar></ActionBar>
    </div>
  );
}

export default App;
