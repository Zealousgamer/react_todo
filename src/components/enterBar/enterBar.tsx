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
    return (
        <div className='enterBar'>
            <input className='inputTask' type="text" name="task" placeholder={placeholder} defaultValue={taskValue} onInput={e => setTaskValue((e.target as HTMLInputElement).value)}></input>
            <form className={classes.root} autoComplete="off">
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-age-simple">
                    Priority
                    </InputLabel>
                    <Select onChange={e => setPriority((e.target as HTMLSelectElement).value)} input={<OutlinedInput labelWidth={0} name="priority" id="outlined-age-simple" />}>
                        <MenuItem value='low'>Low</MenuItem>
                        <MenuItem value='medium'>Medium</MenuItem>
                        <MenuItem value='high'>High</MenuItem>
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