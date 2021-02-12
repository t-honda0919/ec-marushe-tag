import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
    'select': {
        width: 95,
        marginRight: '10px'
    },
});

const SelectBox = (props) => {
    const classes = useStyles();

    return (
        <FormControl>
            <InputLabel>{props.label}</InputLabel>
            <Select 
                className={classes.select}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
            >
            {props.list.length > 0 && (
                props.list.map(item => (
                    <MenuItem value={item.value} key={item.value}>{item.label}</MenuItem>
                ))
            )}
            </Select>
        </FormControl>
    );
};

export default SelectBox;