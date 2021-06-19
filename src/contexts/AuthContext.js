import React from 'react';
import {auth} from '../firebase';

const AuthContext=React.createContext();

export function useAuth(){
    return React.useContext(AuthContext);
}

export function AuthProvider({children}){
const[currentUser,setCurrentUser]=React.useState();
const[loading,setLoading]=React.useState(true);

function signup(email,password){
    return auth.createUserWithEmailAndPassword(email,password);
}

function login(email,password){
    return auth.signInWithEmailAndPassword(email,password);
}

function logout(){
     auth.signOut();
}

function emailUpdate(email){
    return currentUser.updateEmail(email)
}

function passwordUpdate(password){
    return currentUser.updatePassword(password);
}

function resetpassword(email){
    return auth.sendPasswordResetEmail(email);
}

let Value={
    currentUser,
    signup,
    login,
    logout,
    resetpassword,
    emailUpdate,
    passwordUpdate
}

React.useEffect(()=>{
    const unsubscribe=auth.onAuthStateChanged((user)=>{
     setCurrentUser(user);
     setLoading(false)
    })

    return unsubscribe
},[]);



    return(
        <AuthContext.Provider value={Value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}