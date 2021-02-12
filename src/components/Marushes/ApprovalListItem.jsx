import React from 'react';
import {useDispatch} from 'react-redux';
import {push} from 'connected-react-router';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import {makeStyles} from '@material-ui/styles';
import {datetimeToString} from '../../function/common';
import NoImage from '../../assets/img/src/no_image.png';

const useStyles = makeStyles((theme) => ({
    'list': {
        height: 128
    },
    'icon': {
        objectFit: "cover",
        margin: 16,
        height: 96,
        width: 96,
        borderRadius: '50% 50% 50% 50%'
    },
    'text': {
        width: "100%"
    },
    'marusheName': {
        fontSize: '25px'
    },
    'approvalName': {
        fontSize: '15px',
        marginLeft: '10px'
    },
    'approval_at': {
        fontSize: '12px',
        color: theme.palette.grey["500"],
        marginLeft: '10px'
    }
}));

const ApprovalListItem = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return(
        <>
            <ListItem className={classes.list} onClick={() => dispatch(push("/marushe_request/" + props.id))}>
                <ListItemAvatar>
                    <img className={classes.icon} src={props.icons.length > 0 ? props.icons[0].path : NoImage} alt="アイコン画像" />
                </ListItemAvatar>
                <div className={classes.text}>
                    <div className={classes.marusheName}>{props.marusheName}</div>
                    <div className={classes.approvalName}>{"申請者：" + props.approvalRequestName}</div>
                    <div className={classes.approval_at}>{'申請日：' + datetimeToString(props.approvalRequestAt.toDate())}</div>
                </div>
            </ListItem>
            <Divider />
        </>
    );
};

export default ApprovalListItem;