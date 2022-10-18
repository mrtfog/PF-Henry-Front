import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../../firebase'
import axios from 'axios'
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, signInWithRedirect, updateProfile, updatePassword, deleteUser, reauthenticateWithCredential, EmailAuthProvider, sendPasswordResetEmail, EmailAuthCredential, reauthenticateWithPopup } from 'firebase/auth'
import { clearCart } from '../../redux/actions/cart'
import { useDispatch } from 'react-redux'
import { postCart } from '../../redux/actions/cart'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import { useHistory } from 'react-router-dom'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}


export function AuthProvider({ children }) {

    const dispatch = useDispatch()
    const history = useHistory()

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signInWithGoogle() {

        const provider = new GoogleAuthProvider();

        signInWithRedirect(auth, provider)

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
            .then(() => {
                history.push('/')
            })
            .catch(() => {
                Swal.fire({
                    text: 'Incorrect email or password, please try again',
                    icon: 'error',
                    iconColor: '#497aa6',
                    showCloseButton: true,
                    showDenyButton: false,
                    confirmButtonText: 'Ok',
                    allowEnterKey: false,
                    customClass: {
                        popup: 'Alert',
                        closeButton: 'closeButton',
                        confirmButton: 'confirmButton',
                        denyButton: 'denyButton',
                    }
                })
            })
    }

    function logOut() {
        dispatch(clearCart())
        sessionStorage.clear()
        return signOut(auth)
    }

    function changeUsername(currentUser) {

        Swal.fire({

            text: 'Please enter your new username',
            showCloseButton: true,
            showDenyButton: true,
            denyButtonText: 'Cancel',
            confirmButtonText: 'Submit',
            input: 'text',
            inputPlaceholder: 'New username',
            allowEnterKey: false,
            customClass: {
                popup: 'Alert',
                closeButton: 'closeButton',
                confirmButton: 'confirmButton',
                denyButton: 'denyButton',
            }
        })
            .then((result) => {

                const newUsername = result.value

                if (result.isConfirmed) {
                    Swal.fire({
                        text: 'Are you sure you want to change your username?',
                        icon: 'question',
                        iconColor: '#497aa6',
                        showCloseButton: true,
                        showDenyButton: false,
                        confirmButtonText: 'Yes, I am sure',
                        allowEnterKey: false,
                        customClass: {
                            popup: 'Alert',
                            closeButton: 'closeButton',
                            confirmButton: 'confirmButton',
                            denyButton: 'denyButton',
                        }
                    })
                        .then((result) => {

                            if (result.isConfirmed) {

                                if (newUsername.trim() !== '') {
                                    updateProfile(currentUser, {
                                        displayName: newUsername
                                    })
                                        .then(() => {

                                            Swal.fire({
                                                text: 'Username changed succesfully',
                                                icon: 'success',
                                                iconColor: '#497aa6',
                                                showCloseButton: true,
                                                showDenyButton: false,
                                                confirmButtonText: 'Continue',
                                                allowEnterKey: false,
                                                customClass: {
                                                    popup: 'Alert',
                                                    closeButton: 'closeButton',
                                                    confirmButton: 'confirmButton',
                                                    denyButton: 'denyButton',
                                                }
                                            })
                                                .then(() => {
                                                    window.location.reload()
                                                })

                                        })
                                        .catch((e) => {
                                            console.log('erorrr', e)
                                            Swal.fire({
                                                text: 'An error occurred, please try again',
                                                icon: 'error',
                                                iconColor: '#497aa6',
                                                showCloseButton: true,
                                                showDenyButton: false,
                                                confirmButtonText: 'Ok',
                                                allowEnterKey: false,
                                                customClass: {
                                                    popup: 'Alert',
                                                    closeButton: 'closeButton',
                                                    confirmButton: 'confirmButton',
                                                    denyButton: 'denyButton',
                                                }
                                            })
                                        })
                                }
                            }
                        })
                }
            })

    }

    function changePassword(currentUser) {

        Swal.fire({

            text: 'Please enter your current password',
            showCloseButton: true,
            showDenyButton: true,
            denyButtonText: 'I forgot my password',
            confirmButtonText: 'Submit',
            input: 'password',
            inputLabel: 'Password',
            inputPlaceholder: 'Current Password',
            allowEnterKey: false,
            customClass: {
                popup: 'Alert',
                closeButton: 'closeButton',
                confirmButton: 'confirmButton',
                denyButton: 'denyButton',
            }
        })
            .then((result) => {

                if (result.isConfirmed) {

                    if (result.value.trim() !== '') {

                        let credential = EmailAuthProvider.credential(currentUser.email, result.value)
                        reauthenticateWithCredential(currentUser, credential)
                            .catch(e => {
                                Swal.fire({
                                    text: 'Incorrect Password',
                                    icon: 'error',
                                    iconColor: '#497aa6',
                                    showCloseButton: true,
                                    showDenyButton: false,
                                    confirmButtonText: 'Ok',
                                    allowEnterKey: false,
                                    customClass: {
                                        popup: 'Alert',
                                        closeButton: 'closeButton',
                                        confirmButton: 'confirmButton',
                                        denyButton: 'denyButton',
                                    }
                                })
                            })
                        Swal.fire({
                            text: 'Enter your new password',
                            showCloseButton: true,
                            showDenyButton: false,
                            confirmButtonText: 'Change Password',
                            input: 'password',
                            inputLabel: 'Password',
                            inputPlaceholder: 'New Password',
                            allowEnterKey: false,
                            customClass: {
                                popup: 'Alert',
                                closeButton: 'closeButton',
                                confirmButton: 'confirmButton',
                                denyButton: 'denyButton',
                            }
                        })
                            .then(result => {

                                if (result.isConfirmed) {

                                    if (result.value.trim() !== '') {

                                        updatePassword(currentUser, result.value)
                                            .then(() => {
                                                Swal.fire({
                                                    text: 'Password updated successfully',
                                                    icon: 'success',
                                                    iconColor: '#497aa6',
                                                    showCloseButton: true,
                                                    showDenyButton: false,
                                                    confirmButtonText: 'Continue',
                                                    allowEnterKey: false,
                                                    customClass: {
                                                        popup: 'Alert',
                                                        closeButton: 'closeButton',
                                                        confirmButton: 'confirmButton',
                                                        denyButton: 'denyButton',
                                                    }
                                                })
                                            })
                                            .catch(() => {
                                                Swal.fire({
                                                    text: 'An error occurred, please try again',
                                                    icon: 'error',
                                                    iconColor: '#497aa6',
                                                    showCloseButton: true,
                                                    showDenyButton: false,
                                                    confirmButtonText: 'Ok',
                                                    allowEnterKey: false,
                                                    customClass: {
                                                        popup: 'Alert',
                                                        closeButton: 'closeButton',
                                                        confirmButton: 'confirmButton',
                                                        denyButton: 'denyButton',
                                                    }
                                                })
                                            })
                                    }
                                }
                            })
                    }
                }
                if (result.isDenied) {
                    Swal.fire({

                        text: 'Did you forget your password ? Reset it',
                        showCloseButton: true,
                        showDenyButton: true,
                        denyButtonText: 'Cancel',
                        confirmButtonText: 'Send me a password reset email',
                        allowEnterKey: false,
                        customClass: {
                            popup: 'Alert',
                            closeButton: 'closeButton',
                            confirmButton: 'confirmButton',
                            denyButton: 'denyButton',
                        }
                    })
                        .then(result => {

                            if (result.isConfirmed) {
                                sendPasswordResetEmail(auth, currentUser.email)
                                Swal.fire({

                                    text: 'Password reset email sent successfully',
                                    showCloseButton: true,
                                    showDenyButton: false,
                                    confirmButtonText: 'Ok',
                                    allowEnterKey: false,
                                    customClass: {
                                        popup: 'Alert',
                                        closeButton: 'closeButton',
                                        confirmButton: 'confirmButton',
                                        denyButton: 'denyButton',
                                    }
                                })
                            }
                        })
                }
            })


    }

    function deleteAccount(currentUser) {

        deleteUser(currentUser)
            .then(() => {

                Swal.fire({
                    text: 'Account deleted succesfully',
                    icon: 'success',
                    iconColor: '#497aa6',
                    showCloseButton: true,
                    showDenyButton: false,
                    confirmButtonText: 'Continue',
                    allowEnterKey: false,
                    customClass: {
                        popup: 'Alert',
                        closeButton: 'closeButton',
                        confirmButton: 'confirmButton',
                        denyButton: 'denyButton',
                    }
                })
                history.push('/')

            })
            .catch(() => {
                Swal.fire({
                    text: 'An error occurred, please try again',
                    icon: 'error',
                    iconColor: '#497aa6',
                    showCloseButton: true,
                    showDenyButton: false,
                    confirmButtonText: 'Ok',
                    allowEnterKey: false,
                    customClass: {
                        popup: 'Alert',
                        closeButton: 'closeButton',
                        confirmButton: 'confirmButton',
                        denyButton: 'denyButton',
                    }
                })
            })

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
            if (currentUser) axios.get("https://pf-henry-back.herokuapp.com/user/emailSend", { headers: { "user": currentUser.accessToken } })
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
        logOut,
        changePassword,
        changeUsername,
        deleteAccount
    }


    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}