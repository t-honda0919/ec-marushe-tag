import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getIsSignedIn} from './reducks/users/selectors';
import {listenAuthState} from './reducks/users/operations';

const Auth = ({children}) => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);

    const isSignedIn = getIsSignedIn(selector);

    useEffect(() => {
        if (!isSignedIn) {
            dispatch(listenAuthState());
        }
    }, [dispatch, isSignedIn]);

    if (!isSignedIn) {
        if (children[0].props.component.name === "Home") {
            return children;
        } else {
            return <></>
        }
    } else {
        return children;
    }
};

export default Auth;