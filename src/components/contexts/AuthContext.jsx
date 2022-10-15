import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../../firebase'
import axios from 'axios'
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, signInWithRedirect, updateProfile, getRedirectResult } from 'firebase/auth'
import { clearCart } from '../../redux/actions/cart'
import { useDispatch } from 'react-redux'
import { postCart } from '../../redux/actions/cart'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}


export function AuthProvider({ children }) {

    const dispatch = useDispatch()

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    const authh = getAuth()


    function signInWithGoogle() {

        const provider = new GoogleAuthProvider();

        signInWithRedirect(auth, provider)

        // getRedirectResult(auth)

        // .then((result)=>{
        //     axios.post('https://pf-henry-back.herokuapp.com/user/register', result.user)
        // } )

        // .catch(e => console.log(e))
    }

    async function signUp(email, password, username) {

        createUserWithEmailAndPassword(auth, email, password)

        onAuthStateChanged(auth, (user) => {

            if (user) {

                updateProfile(user, {
                    displayName: username
                })

                axios.post('https://pf-henry-back.herokuapp.com/user/register', { user: { ...user, displayName: username }, reservations: [] })

            }
        })

    }

    function logIn(email, password) {
        signInWithEmailAndPassword(auth, email, password)
    }


    function logOut() {
        dispatch(clearCart())
        sessionStorage.clear()
        return signOut(auth)
    }

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe

    }, [])

    useEffect(() => {


        try {
            console.log("uwu")
            const sessionCart = JSON.parse(sessionStorage.getItem("newCart")) || []

            if (sessionCart.length && currentUser) {

                for (const reserv of sessionCart) {
                    dispatch(postCart({ ...reserv, userId: currentUser.uid }, currentUser.accessToken))
                }

                sessionStorage.clear()
            }


        } catch (e) {
            console.log(e)
        }

    }, [currentUser])


    let value = {
        currentUser,
        signUp,
        logIn,
        signInWithGoogle,
        logOut
    }


    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}