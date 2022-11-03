import React, { useState, useRef } from 'react';
import "../css/Login.css";
import demoLogo from "../sample/posts/demo-logo.png";
import { Link, useNavigate } from "react-router-dom";

// This line imports the custom hook we created in AuthContext which returns
// the AuthContext with a useContext() hook applied on it.
import { useAuth } from "../contexts/AuthContext";

function Login() {

    const navigate = useNavigate();

    // We create refs for the data we will need to gather from the form.
    const emailRef = useRef();
    const passwordRef = useRef();

    // We get the usable AuthContext with useAuth().
    const authContext = useAuth();

    // We get the login method from the auth context.
    const login = authContext.login;

    // TEMPORARY, TO REMOVE
    const currentUser = authContext.currentUser;

    // Creates a state for errors.
    const [error, setError] = useState('');

    // Redirect user to feed if logged in.
    if (authContext.currentUser) {
        navigate("/feed")
    }

    async function handleSubmit(e) {
        e.preventDefault();

        // When first logging in, we make sure that the error is blank.
        // Then, we set loading to true, before we actually fire up the async login method
        // When it's done, the loading state is set to false.
        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value)
            .then(() => {
                console.log(currentUser.uid);
            })
            
            navigate("/feed");
        } catch {
            setError('Invalid email or password');   
        }
        setLoading(false);
    }


    // Creates a loading state that we will use to disable the button when the signup is
    // being processed.
    const [loading, setLoading] = useState(false);

    return (<>
        <div id="Login">
            <div id="left-rect">
                {error && <div id="error">{error}</div>}
                <div id="welcome-text">Welcome <span className="magenta-text">Back.</span></div>
                <form onSubmit={handleSubmit}>
                    <input id="username" type="text" ref={emailRef} placeholder="Email" />
                    <input id="password" type="password" ref={passwordRef} placeholder='Password' />
                    <button id="sign-button" className='filled-btn' disabled={loading}>
                    Login</button>
                    <div id="forgotPass" class="centered"><Link to="/forgot">Forgot Password?</Link></div>
                    <div id="has-account">Need an account? <Link id= "signup-link" className="magenta-text" to="/signup">Sign Up</Link></div>
                </form>
                <div id="logo-div">
                    <img src={demoLogo}></img>
                    <div>Lasco</div>
                </div>
            </div>
            <div id="right-rect"></div>
        </div>
    </>);
}

export default Login;