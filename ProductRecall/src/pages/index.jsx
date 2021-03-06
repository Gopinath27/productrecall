import React from "react";
import { Link } from "react-router-dom";
import ParticlesBg from "particles-bg";





import './Welcome.css';
import store from './store.PNG';

const WelcomePage = () => {
    return (
        <div className="Welcome-header">
            <h1>Welcome to BE-FRESH Stores</h1>
            <h4>PRODUCT RECALL</h4>
            <ParticlesBg type="fountain" num={2} bg={true} />
            <Link to="/login">Click here to Login Page</Link> <br /><br />
        </div>
    );
};

export default WelcomePage;