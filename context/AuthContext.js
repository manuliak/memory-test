import React, { useState, useEffect, createContext, useContext } from 'react'

import { auth } from '../helpers/firebase'
const AuthContext = createContext();

export function useAuth () {
    return useContext(AuthContext);
}

export function AuthState ({ children }) {
    const [ currentUser, setCurrentUser ] = useState(null);


    const signIn = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    }

    const signUp = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    const logout = () => {
        auth.signOut();
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged( user => setCurrentUser(user) );

        return unsubscribe;
    }, [])

    const value  = {
        currentUser,
        signIn,
        signUp,
        logout
    }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}