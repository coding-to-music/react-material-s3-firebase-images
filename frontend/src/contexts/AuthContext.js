import React, { useContext, useState, useEffect } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail, deleteUser, updateEmail, updatePassword, EmailAuthProvider, reauthenticateWithCredential, updateProfile } from "firebase/auth"
import { auth } from "../components/firebase"

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState("loading");

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function updateUserProfile(displayName, imageUrl) {
        return updateProfile(currentUser, {
            displayName: displayName, photoURL: imageUrl
          });
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function signout() {
        return signOut(auth);
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    function deleteAccount() {
        return deleteUser(currentUser);
    }

    function updateUserEmail(email) {
        return updateEmail(currentUser, email);
    }

    function updateUserPassword(providedPassword) {
        return updatePassword(currentUser, providedPassword)
    }

    function reauthenticateUser(providedPassword) {
        var credential = EmailAuthProvider.credential(
            currentUser.email, providedPassword
        );

        return reauthenticateWithCredential(currentUser, credential);
    }

    useEffect(handleAuthStateChanged, [])

    // As soon as the state of authentication (on login/logout), a variable "user" is given
    // and the state of currentUser is updated to that user.
    // When the auth state changes, the listener returns a method that makes it possible to 
    // unsubscribe from the listener (i.e., deactivate it).
    // This is why we return the "unsubscribe" method in this function.
    function handleAuthStateChanged() {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setCurrentUser(user)
            } else {
                setCurrentUser(null);
            }
        })

        return unsubscribe;
    }
    

    const value = {
        currentUser,
        signup,
        login,
        signout, 
        resetPassword,
        updateUserEmail,
        updateUserPassword,
        reauthenticateUser, 
        deleteAccount,
        updateUserProfile
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
