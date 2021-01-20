import React from "react";
import { Link } from "react-router-dom";

import './Welcome.css';
import store from './store.PNG';

const WelcomePage = () => {
    return (
        <div className="Welcome-header">
            <img src={store} className="Welcome-logo" alt="store" />
            <h1>Welcome to Product Recall</h1>
            <Link to="/login">Click here to Login Page</Link>
        </div>
    );
};

export default WelcomePage;