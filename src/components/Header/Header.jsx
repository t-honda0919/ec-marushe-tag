import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../../assets/img/icon/logo_transparent.png';
import {getRole, getIsSignedIn} from '../../reducks/users/selectors';
import {push} from 'connected-react-router';
import {ClosableDrawer, HeaderMenus} from './index';

const useStyles = makeStyles((theme) => ({
    'root': {
        flexGrow: 1
    },
    'menuBar': {
        backgroundColor: '#fff',
        color: '#444'
    },
    'toolBar': {
        margin: '0 auto',
        maxWidth: 1024,
        width: '100%'
    },
    'iconButtons': {
        margin: '0 0 0 auto'
    },
    'logo': {
        [theme.breakpoints.down("sm")]: {
            height: '50px',
            width: '80px',
        },
        [theme.breakpoints.up("sm")]: {
            height: '90px',
            width: '128px',
        }
        
    }
}));

const Header = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const isSingedIn = getIsSignedIn(selector);
    const role = getRole(selector);

    const [open, setOpen] = useState(false);

    // ClosableDrawerのCloseコールバック
    const handleDrawerToggle = useCallback((e) => {
        if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
            return;
        }
        setOpen(!open);
    }, [setOpen, open]);

    return(
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.menuBar}>
                <Toolbar className={classes.toolBar}>
                    <img
                        src={logo} alt="logo" className={classes.logo}
                        onClick={() => dispatch(push("/"))}
                    />
                    <div className={classes.iconButtons}>
                        <HeaderMenus
                            handleDrawerToggle={handleDrawerToggle}
                            isSingedIn={isSingedIn}
                        />  
                    </div>
                </Toolbar>
            </AppBar>
            <ClosableDrawer open={open} onClose={handleDrawerToggle} role={role} />
        </div>
    );
};

export default Header;
