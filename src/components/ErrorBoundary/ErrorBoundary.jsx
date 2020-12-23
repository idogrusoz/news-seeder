import React, { Component } from 'react';
import ErrorPage from '../ErrorPage/ErrorPage';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    componentDidCatch(error, errorInfo) {
        this.setState({ error });
    }

    setError = () => {
        this.setState({ hasError: false });
    };

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    render() {
        return this.state.hasError ? <ErrorPage onClick={this.setError} /> : this.props.children;
    }
}
