import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import {getIcons, getUserName} from '../../reducks/users/selectors';
import {push} from 'connected-react-router';
import NoImage from '../../assets/img/src/no_image.png';

const useStyles = makeStyles({
    'icon': {
        marginRight: '5px',
        width: 36,
        height: 36,
        borderRadius: '50% 50% 50% 50%'
    },
    'username': {
        fontSize: '15px'
    }
})

const HeaderMenus = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const username = getUserName(selector);
    const icons = getIcons(selector)

    return(
        <>
            {props.isSingedIn ? (
                <>
                    <img className={classes.icon} src={icons.length > 0 ? icons[0].path : NoImage} alt="アイコン画像" />
                    <span className={classes.username}>{username + 'さん'}</span>
                    <IconButton onClick={(e) => props.handleDrawerToggle(e)} >
                        <MenuIcon/>
                    </IconButton>
                </>
            ) : (
                <IconButton onClick={() => dispatch(push('/login'))}>
                    <ExitToAppIcon />
                    <span>{"ログイン"} </span>
                </IconButton>
            )}
        </>
    );
};

export default HeaderMenus;