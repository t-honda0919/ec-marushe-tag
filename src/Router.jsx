import React from 'react';
import {Switch, Route} from 'react-router';
import {Home, Login, Registar, RegistarConfirm, MarusheRequest, MarusheRequestConfirm, MarusheRequestDetail, MarusheRequestList} from './templates';
import Auth from './Auth';

const Router = () => {
    return(
        <Switch>
            <Route exact path={'/login'} component={Login} />
            <Route exact path={'/registar'} component={Registar} />
            <Route exact path={'/registar/confirm'} component={RegistarConfirm} />
            <Auth>
                <Route exact path={'(/)?'} component={Home} />
                <Route exact path={'/marushe_request'} component={MarusheRequest} />
                <Route exact path={'/marushe_request/confirm'} component={MarusheRequestConfirm} />
                <Route path={"/marushe_request/(/:id)?"} component={MarusheRequestDetail} />
                <Route exact path={'/marushe_request/list'} component={MarusheRequestList} />
            </Auth>
        </Switch>
    );
};

export default Router;