import React from 'react'
import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute() {

    const { currentUser } = useAuth();

    // If the state of the current user is loading, then it displays the loading div.
    // Else, it checks whether currentUser doesn't exist.
    // If it doesn't, it goes to /login.
    // If it exists, it renders the Outlet, which renders the children of the Route containing the PrivateRoute.
    return ((currentUser === "loading") ? <div>Loading...</div> : (!currentUser ? <Navigate to="/login"/> : <Outlet/>))
  
}
