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

export const addToCounter = (store: any, amount: number) => {
    const counter = store.state.counter + amount;
    store.setState({counter: counter});
    localStorage.setItem('todoState',JSON.stringify(store.state));
};

export const addNewTask = (store: any, id: number, task: string, priority: string) => {
    const newTaskValue: Tasks = {id:id,task:task,status:Status.INCOMPLETE,priority:priority,position:id};
    store.state.tasks.push(newTaskValue);
    localStorage.setItem('todoState',JSON.stringify(store.state));
};

export const getTaskByPosition = (store: any, position: number) => {
    const tasks: Tasks[]  = store.state.tasks;
    const task: Tasks[] = tasks.filter(task => task.position === position);
    return task;
};

export const getTaskByID = (store: any, id: number) => {
    const tasks: Tasks[]  = store.state.tasks;
    const task: Tasks[] = tasks.filter(task => task.position === id);
    return task;
};

export const removeTaskByID = (store: any, id: number) => {
    const tasks: Tasks[]  = store.state.tasks;
    const newTaskArray: Tasks[] = tasks.filter(task => task.id !== id);
    store.setState({tasks: newTaskArray});
    localStorage.setItem('todoState',JSON.stringify(store.state));
};

export const changeStatusByID = (store: any, id: number, status: Status) => {
    const tasks: Tasks[]  = store.state.tasks;
    const newTaskArray: any = tasks.map((task: { task: string | undefined; id: number; status: Status; priority: string}) => {
        if(task.id === id) {
            task.status = status;
        }
        return task;
    });
    store.setState({tasks: newTaskArray});
    localStorage.setItem('todoState',JSON.stringify(store.state));
};

export const changeDisplay = (store: any, display: Display) => {
    store.setState({display: display});
    localStorage.setItem('todoState',JSON.stringify(store.state));
};

export const changeTaskPriorityByID = (store: any, id: number, priority: string) => {
    const tasks: Tasks[]  = store.state.tasks;
    const newTaskArray: any = tasks.map((task: { task: string | undefined; id: number; status: Status; priority: string}) => {
        if(task.id === id) {
            task.priority = priority;
        }
        return task;
    });
    store.setState({tasks: newTaskArray});
    localStorage.setItem('todoState',JSON.stringify(store.state));
};

export const changePriority = (store: any, priority: string) => {
    store.setState({priority: priority});
    localStorage.setItem('todoState',JSON.stringify(store.state));
};

export const setTasks = (store: any, tasks: Tasks[]) => {
    store.setState({tasks: tasks});
    localStorage.setItem('todoState',JSON.stringify(store.state));
}