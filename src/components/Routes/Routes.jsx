import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import Headlines from '../Headlines/Headlines';

const Routes = ({ history }) => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={Headlines} />
            </Switch>
        </Router>
    );
};

export default Routes;
