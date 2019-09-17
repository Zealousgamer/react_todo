import React from 'react';
import Radio from '@material-ui/core/Radio';
import useGlobal from '../../store/index';
import './todo.css';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { Icon } from '@material-ui/core';
import DraggableItemWrapper from '../drag_and_drop/DraggableItemWrapper';

interface ITodoProps {
    task: string;
    id: number;
    status: Status;
    priority: string;
    position: number;
}

enum Status {
    COMPLETE,
    INCOMPLETE
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function removeTask (globalActions: any, id: number) {
    globalActions.removeTaskByID(id);
    globalActions.addToCounter(-1);
}

function toggleChecked(id: number, checked: boolean,globalState: any, globalActions: any) {
    if (checked === false) {
        globalActions.changeStatusByID(id,Status.COMPLETE);
        return;
    }
    globalActions.changeStatusByID(id,Status.INCOMPLETE);
}

function changePriority(id: number, priority: string, globalActions: any, setValue: any) {
    globalActions.changeTaskPriorityByID(id,priority);
    setValue(priority);
}

const Todo: React.FC<ITodoProps> = (props) => {
    const {task, id, status, priority, position} = props;
    const [globalState,globalActions] = useGlobal();
    const classes = useStyles();
    const [value, setValue] = React.useState(priority);

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        //@ts-ignore
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    let classNameStatus: string;
    let checked: boolean;
    let isLow: boolean = false;
    let isMedium: boolean = false;
    let isHigh: boolean = false;
    if(status === Status.COMPLETE) {
        classNameStatus = 'complete';
        checked = true;
    } else {
        classNameStatus = 'incomplete';
        checked = false;
    }

    if (priority === 'low') {
        isLow = true;
    } else if (priority === 'medium') {
        isMedium = true;
    } else {
        isHigh = true;
    }
    
    return (
        <DraggableItemWrapper key={`${task}-${id}`} draggableId={`${task}-${id}`} index={position}>
            <div className={`todo ${priority}`}  key={id}>
                <Radio className='toggleStatus' onChange={() => toggleChecked(id,checked,globalState,globalActions)} checked={checked} onClick={() => toggleChecked(id,checked,globalState,globalActions)}></Radio>
                <p className={classNameStatus}>{task}</p>
                <form className={classes.root} autoComplete="off">
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                        Priority
                        </InputLabel>
                        <Select value={value} onChange={e => changePriority(id,(e.target as HTMLSelectElement).value,globalActions,setValue)} input={<OutlinedInput labelWidth={labelWidth} name="priority" id="outlined-age-simple" />}>
                            <MenuItem selected={isLow?isLow:undefined} value='low'>Low</MenuItem>
                            <MenuItem selected={isMedium?isMedium:undefined}  value='medium'>Medium</MenuItem>
                            <MenuItem selected={isHigh?isHigh:undefined} value='high'>High</MenuItem>
                        </Select>
                    </FormControl>
                </form>
                <Button className='remove' onClick={() => removeTask(globalActions, id)}>
                    <Icon >clear</Icon>
                </Button>
            </div>
        </DraggableItemWrapper>
    );
}

export default Todo;