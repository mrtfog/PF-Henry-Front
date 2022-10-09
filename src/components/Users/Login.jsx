import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import style from '../../scss/components/Users/_login.module.scss'
import { useAuth } from '../contexts/AuthContext'
import validate from './ValidationLogin.js'
import { Link } from 'react-router-dom'

export default function Login() {

    const {logIn} = useAuth()

    const history = useHistory()

    const [input, setInput] = useState({

        email: '',
        password:''
    })

    const [errors, setErrors] = useState({})

    const [type, setType] = useState('password')

    function handleClick(){

        setType(type === 'password' ? 'text' : 'password')
    }

    function handleChange(e){

        setInput({
            ...input, 
            [e.target.name]: e.target.value
        })

        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value
            })
        )
    }

    function handleOnSubmit(e){

        e.preventDefault()
        logIn(input.email, input.password)
        history.push('/')

    }

    return (
        <div className={style.container}>


            <div className={style.form_container}>
                <h2>Log In</h2>
                {/* <form action="https://pf-henry-back.herokuapp.com/auth/login" method='POST'> */}
                <form>

                    <div className={style.inputContainer}>
                        <input type='email' placeholder='Enter your email' value={input.email} name='email' onChange={e => handleChange(e)}/>
                        {errors.email && <span>{errors.email}</span>}
                    </div>

                    <div className={style.inputContainer}>
                        <input type={type} placeholder='Enter your password' value={input.password} name='password' onChange={e => handleChange(e)}/>
                        {errors.password && <span>{errors.password}</span>}


                        <div id='showButton' className={style.showButton} onClick={handleClick}>
                        {
                                    type === 'password' ? <svg width="22px" height="16px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                    <path d="M12,4.5 C7,4.5 2.73,7.61 1,12 C2.73,16.39 7,19.5 12,19.5 C17,19.5 21.27,16.39 23,12 C21.27,7.61 17,4.5 12,4.5 Z M12,17 C9.24,17 7,14.76 7,12 C7,9.24 9.24,7 12,7 C14.76,7 17,9.24 17,12 C17,14.76 14.76,17 12,17 Z M12,9 C10.34,9 9,10.34 9,12 C9,13.66 10.34,15 12,15 C13.66,15 15,13.66 15,12 C15,10.34 13.66,9 12,9 Z" id="🔹-Icon-Color"></path>
                                    </svg> 
                                : 
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.86 29.47"><g dataName="Layer 2"><g dataName="Layer 1"><path d="M16.93 5.46a15 15 0 0 1 13.57 8.47 14.78 14.78 0 0 1-3.71 4.8L29 20.9a18.11 18.11 0 0 0 4.9-7A18.24 18.24 0 0 0 11.33 3.26l2.54 2.54a15.5 15.5 0 0 1 3.06-.34Z"/><path d="m15.28 7.22 3.19 3.18 2 2 3.18 3.19A6.84 6.84 0 0 0 16.93 7a6.5 6.5 0 0 0-1.65.22zM1.55 2.19l4.13 4.12A18 18 0 0 0 0 13.93a18.19 18.19 0 0 0 23.58 10.28l5.26 5.26L31 27.3 3.72 0zM7.86 8.5l2.7 2.69a6.62 6.62 0 0 0-.56 2.7 6.88 6.88 0 0 0 9.57 6.35l.06.06 1.51 1.51a16 16 0 0 1-4.23.58 15.06 15.06 0 0 1-13.56-8.46A15.24 15.24 0 0 1 7.86 8.5z"/></g></g></svg>
                                }
                        </div>
                    </div>

                    <div className={style.btnContainer}>
                        <button 
                            className={style.primaryBtn} 
                            type='submit' 
                            onClick={e=> handleOnSubmit(e)}
                            disabled={Object.keys(errors).length !== 0 ? true : false}>Log in
                        </button>
                        
                        <span>Or</span>

                        <div className={style.googleBtn}>
                            <div className={style.googleIconWrapper}>
                                <img className={style.googleIcon} src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="" />
                            </div>
                            <div className={style.btnText}>
                                <a href='https://pf-henry-back.herokuapp.com/auth/google'>Log in with Google</a>
                            </div>
                        </div>

                    </div>

                </form>
                                    
                <div className={style.linkToRegister}>Don't you have an account? 
                    <span>
                        <Link className={style.Link}to='/register'>Sign up</Link>
                    </span>
                </div>
            </div>

        </div>

    )
}
