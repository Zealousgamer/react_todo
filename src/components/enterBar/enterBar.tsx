import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import useGlobal from '../../store/index'
import './enterBar.css';
import { Select, MenuItem, OutlinedInput, FormControl, InputLabel, makeStyles, Icon } from '@material-ui/core';

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

function addTask (globalState: any, globalActions: any, taskValue: string, priority: string) {
    globalActions.addNewTask(globalState.counter,taskValue,priority);
    globalActions.addToCounter(1);
}

const EnterBar: React.FC<IEnterBarProps> = (props) => {
    const [taskValue, setTaskValue] = useState('');
    const [priority, setPriority] = useState('low');
    const {placeholder} = props;
    const [globalState, globalActions] = useGlobal();
    const classes = useStyles();

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        //@ts-ignore
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);
    let isLow: boolean = false;
    let isMedium: boolean = false;
    let isHigh: boolean = false;
    if (priority === 'low') {
        isLow = true;
    } else if (priority === 'medium') {
        isMedium = true;
    } else {
        isHigh = true;
    }

    return (
        <div className='enterBar'>
            <input className='inputTask' type="text" name="task" placeholder={placeholder} defaultValue={taskValue} onInput={e => setTaskValue((e.target as HTMLInputElement).value)}></input>
            <form className={classes.root} autoComplete="off">
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                    Priority
                    </InputLabel>
                    <Select value={priority} onChange={e => setPriority((e.target as HTMLSelectElement).value)} input={<OutlinedInput labelWidth={labelWidth} name="priority" id="outlined-age-simple" />}>
                        <MenuItem selected={isLow?isLow:undefined} value='low'>Low</MenuItem>
                        <MenuItem selected={isMedium?isMedium:undefined}  value='medium'>Medium</MenuItem>
                        <MenuItem selected={isHigh?isHigh:undefined} value='high'>High</MenuItem>
                    </Select>
                </FormControl>
            </form>
            <Button onClick={() => addTask(globalState, globalActions, taskValue,priority)}>
                <Icon>add_circle</Icon>
            </Button>
        </div>
    );


}

interface IEnterBarProps {
    placeholder?: string;
}

export default EnterBar;