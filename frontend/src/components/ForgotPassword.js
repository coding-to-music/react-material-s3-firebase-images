import React, { useRef, useState } from 'react';
import demoLogo from "../sample/posts/demo-logo.png";
import "../css/Login.css"
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ForgotPassword() {

    const emailRef = useRef();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    
    const { resetPassword } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setMessage("");
            setError("");
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("Check your inbox to reset your password!")
        } catch {
            setError("Failed to reset password");
        }

        setLoading(false);
    }

    return (
        <div id="Login">
            <div id="left-rect">
                {error && <div>{error}</div>}
                {message && <div>{message}</div>}
                <div id="welcome-text">Reset <span className="magenta-text">Password.</span></div>
                <form onSubmit={handleSubmit}>
                    <input id="email" type="text" ref={emailRef} placeholder="Email" />
                    <button id="sign-button" className='filled-btn' disabled={loading}>
                        Send</button>
                    <div id="login-div"><Link to="/login">Login</Link></div>
                </form>        
                <div id="logo-div">
                    <img src={demoLogo}></img>
                    <div>Lasco</div>
                </div>
            </div>
            <div id="right-rect"></div>
        </div>)
}