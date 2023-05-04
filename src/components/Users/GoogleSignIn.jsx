import React from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import style from '../../scss/components/Users/_GoogleSignIn.module.scss'


export default function GoogleSignIn() {

    const { signInWithGoogle } = useAuth()
    const history = useHistory()

    function handleGoogleSignIn(){

        signInWithGoogle()
        history.push('/')
    }

    return (
        <div className={style.googleBtn} onClick={handleGoogleSignIn}>
            <div className={style.googleIconWrapper}>
                <img className={style.googleIcon} src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="" />
            </div>
            <div className={style.btnText}>Log in with Google</div>
        </div>  
    )
}
