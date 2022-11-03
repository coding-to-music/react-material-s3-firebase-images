import React, { useEffect, useState } from 'react';
import PortalNav from './PortalNav';
import '../css/Portal.css';

import { useAuth } from "../contexts/AuthContext";
import { useDb } from "../contexts/DatabaseContext";
import { useNavigate } from "react-router-dom";

function Portal(props) {
    const { userInfo} = useDb();
    // We import currentUser & signout from useAuth.
    const [error, setError] = useState('')
    const { currentUser, signout } = useAuth(); 

    const navigate = useNavigate();

    async function handleLogout() {
        setError('');
        try {
            await signout()
            navigate("/")
        } catch {
            setError('Failed to Sign Out');
        }
    }

    return (
        <div id="Portal">
            <PortalNav></PortalNav>
            {error && <div>{error}</div>}
            {currentUser && <div>Logged in as {currentUser.email}. <span onClick={handleLogout}>Sign Out</span></div>}
            {userInfo && <div>Logged in as {userInfo.username}. <span onClick={handleLogout}>Sign Out</span></div>}
            {React.createElement(props.currentPage)}
        </div>
        )
}

export default Portal;