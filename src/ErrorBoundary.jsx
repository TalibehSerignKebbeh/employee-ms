import React, { Component } from "react";
import ErrorScreen from "./ErrorScreen";


export default class ErrorBoundary extends Component {
    // const { error } = this.state;
    // state = { error: null };
    state = { error: null };

    static getDerivedStateFromError(error) {
        return { error }
    }

    render() {
        const { error } = this.state;
        const { children } = this.props;
        // const { children, Fallback } = this.props;

        if (error) return <ErrorScreen error={error} />
        // if (error && !Fallback) return <ErrorScreen error={error} />
        return children
    }
}

