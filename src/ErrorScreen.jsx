import React from 'react';
import './ErrorScreen.css'
const ErrorScreen = ({ error }) => {
    let message = error?.message || ''
    return (
        <div className="error">
            <h3>We are sorry... something went wrong</h3>
            <p>We cannot process your request at this moment.</p>
            <p>ERROR: {message}</p>
        </div>
    );
}

export default ErrorScreen;
