import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import useGlobal from '../../store/index';
import './actionBar.css';

enum Display {
    ALL,
    COMPLETE,
    INCOMPLETE
}

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    formControl: {
      margin: theme.spacing(3),
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
    },
    group: {
      margin: theme.spacing(1, 0),
      flexDirection: 'row',
    },
    MuiFormLabel: {
        margin: theme.spacing(1, 0),
        alignItems: 'center',
        textAlign: 'center',
        padding: '10px',
    }
  }));

const ActionBar: React.FC = () => {
    const [globalState,globalActions] = useGlobal();
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <span>
                <Button onClick={() => globalActions.changeDisplay(Display.ALL)}>All</Button>
                <Button onClick={() => globalActions.changeDisplay(Display.COMPLETE)}>Complete</Button>
                <Button onClick={() => globalActions.changeDisplay(Display.INCOMPLETE)}>Incomplete</Button>
            </span>
            <FormControl className={classes.formControl}>
                <FormLabel component='label' className={classes.MuiFormLabel}>Priority Select:</FormLabel>
                <RadioGroup value={globalState.priority} className={classes.group} aria-label="priority"name="priority">
                    <FormControlLabel id='all' value='all' control={<Radio />} label='All' onChange={() => globalActions.changePriority('all')}></FormControlLabel>
                    <FormControlLabel id='low' value='low' control={<Radio />} label='Low' onChange={() => globalActions.changePriority('low')}></FormControlLabel>
                    <FormControlLabel id='medium' value='medium' control={<Radio />} label='Medium' onChange={() => globalActions.changePriority('medium')}></FormControlLabel>
                    <FormControlLabel id='high' value='high' control={<Radio />} label='High' onChange={() => globalActions.changePriority('high')}></FormControlLabel>
                </RadioGroup>
            </FormControl>
        </div>
    );
}

export default ActionBar;