import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import Headlines from '../Headlines/Headlines';
import Article from '../Article/Article';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import ErrorPage from '../ErrorPage/ErrorPage';

const Routes = ({ history, selected, setSelected }) => {
    return (
        <ErrorBoundary>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" render={() => <Headlines setSelected={setSelected} />} />
                    <Route path="/article" render={() => (selected ? <Article article={selected} /> : <ErrorPage />)} />
                </Switch>
            </Router>
        </ErrorBoundary>
    );
};

export default Routes;
