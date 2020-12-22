import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import Headlines from '../Headlines/Headlines';
import Article from '../Article/Article';

const Routes = ({ history, selected, setSelected }) => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" render={() => <Headlines setSelected={setSelected} />} />
                <Route path="/article" render={() => <Article article={selected} />} />
            </Switch>
        </Router>
    );
};

export default Routes;
