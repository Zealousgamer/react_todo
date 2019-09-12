import React from "react";
//@ts-ignore
import useGlobalHook from "use-global-hook";

import * as actions from "../actions";

interface State {
    counter: number,
    display: Display,
    priority: string,
    tasks: Tasks[]
}

interface Tasks {
    id: number,
    task: string,
    status: Status
    priority: string
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

const localStore: any = localStorage.getItem('todoState') || '';
let initialState: State

if (localStore === '') {
    initialState = {
        counter: 0,
        display: Display.ALL,
        priority: 'all',
        tasks: []
    };
    localStorage.setItem('todoState',JSON.stringify(initialState));
} else {
    initialState = JSON.parse(localStore);
}


const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;