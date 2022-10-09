import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../../firebase'
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}


export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)



    function signUp(email, password){

        createUserWithEmailAndPassword(auth, email, password)
        // onAuthStateChanged( auth, (user) =>{

        //     console.log('username', user.displayName)
        // })

    }

    function logIn(email, password){

        signInWithEmailAndPassword(auth, email, password)
        
    }

    useEffect(()=>{

        const unsubscribe = onAuthStateChanged( auth, (user) =>{
            setCurrentUser(user)
            setLoading(false)
        })
    
        return unsubscribe

    }, [])

    useEffect(()=>{

        console.log(currentUser)

    }, [currentUser])

    
    let value={
        currentUser,
        signUp,
        logIn
    }


    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}