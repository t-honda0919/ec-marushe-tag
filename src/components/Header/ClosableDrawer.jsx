import React from 'react';
import {useDispatch} from 'react-redux';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles} from '@material-ui/styles';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import StoreIcon from '@material-ui/icons/Store';
import {push} from 'connected-react-router';
import {signOut} from '../../reducks/users/operations';

const ROLE_ADMINISTRATOR = 'administrator';

const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up("sm")]: {
            flexShrink: 0,
            width: 256
        }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: 256
    }
}));

const ClosableDrawer = (props) => {
    const classes = useStyles();
    const {container} = props;
    const dispatch = useDispatch();

    // メニュー選択ファンクション
    const selectMenu = (e, path) => {

        if (path === 'logout') {
            dispatch(signOut());
        } else {
            dispatch(push(path));
        }

        props.onClose(e);
    };

    // メニュー配列
    const menus = [
        {func: selectMenu, label: 'プロフィール', icon: <PersonIcon />, id: 'profile', value: '/user/mypage'},
        {func: selectMenu, label: props.role === ROLE_ADMINISTRATOR ? 'マルシェ申請一覧' : 'マルシェ申請', icon: <StoreIcon />
            , id: 'marushe_request', value: props.role === ROLE_ADMINISTRATOR ? '/marushe_request/list' : '/marushe_request'},
        {func: selectMenu, label: 'ログアウト', icon: <ExitToAppIcon />, id: 'logout', value: 'logout'},
    ]

    return(
        <nav className={classes.drawer}>
            <Drawer
                container={container}
                variant="temporary"
                anchor="right"
                open={props.open}
                onClose={(e) => props.onClose(e)}
                classes={{paper: classes.drawerPaper}}
                ModalProps={{keepMounted: true}}
            >
                <div
                    onClose={(e) => props.onClose(e)}
                    onKeyDown={(e) => props.onClose(e)}
                >
                    <List>
                        {menus.map(menu => (
                            <ListItem button key={menu.id} onClick={(e) => menu.func(e, menu.value)}>
                                <ListItemIcon>
                                    {menu.icon}
                                </ListItemIcon>
                                <ListItemText primary={menu.label} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                </div>
            </Drawer>
        </nav>
    );
};

export default ClosableDrawer;