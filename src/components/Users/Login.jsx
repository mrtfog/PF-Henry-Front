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
                    <input type='email' placeholder='Enter your email' value={input.email} name='email' onChange={e => handleChange(e)}/>
                    {errors.email && <span>{errors.email}</span>}
                    
                    <input type={type} placeholder='Enter your password' value={input.password} name='password' onChange={e => handleChange(e)}/>
                    {errors.password && <span>{errors.password}</span>}

                    <div id='showButton' className={style.showButton} onClick={handleClick}>
                        {
                            type === 'password' ? 
                            
                            <svg width="22px" height="16px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <path d="M12,4.5 C7,4.5 2.73,7.61 1,12 C2.73,16.39 7,19.5 12,19.5 C17,19.5 21.27,16.39 23,12 C21.27,7.61 17,4.5 12,4.5 Z M12,17 C9.24,17 7,14.76 7,12 C7,9.24 9.24,7 12,7 C14.76,7 17,9.24 17,12 C17,14.76 14.76,17 12,17 Z M12,9 C10.34,9 9,10.34 9,12 C9,13.66 10.34,15 12,15 C13.66,15 15,13.66 15,12 C15,10.34 13.66,9 12,9 Z" id="🔹-Icon-Color"></path>
                            </svg> 

                            : 
                            <svg version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            width="22px" height="16px" viewBox="0 0 32 32" style={{enableBackground:'new 0 0 32 32'}} xmlSpace="preserve">
                            <path className="stone_een" d="M31.488,17.932c0.35-0.572,0.388-1.278,0.096-1.882C30.291,13.381,25.83,6,16,6
                            S1.709,13.381,0.416,16.051c-0.292,0.603-0.255,1.31,0.096,1.882c0.627,1.024,1.864,2.733,3.886,4.315l-1.424,1.697
                            c-0.177,0.211-0.15,0.527,0.062,0.704h0c0.211,0.177,0.527,0.15,0.704-0.062l1.472-1.753c1.194,0.825,2.622,1.576,4.311,2.143
                            l-0.835,2.292c-0.094,0.259,0.039,0.546,0.299,0.641l0,0c0.259,0.094,0.546-0.039,0.64-0.299l0.852-2.34
                            c1.485,0.41,3.153,0.67,5.021,0.712V28.5c0,0.276,0.224,0.5,0.5,0.5h0c0.276,0,0.5-0.224,0.5-0.5v-2.517
                            c1.868-0.042,3.536-0.303,5.021-0.712l0.852,2.34c0.094,0.259,0.381,0.393,0.64,0.299l0,0c0.259-0.094,0.393-0.381,0.299-0.641
                            l-0.835-2.292c1.689-0.568,3.118-1.318,4.311-2.143l1.472,1.753c0.177,0.211,0.493,0.239,0.704,0.062l0,0
                            c0.211-0.177,0.239-0.493,0.062-0.704l-1.424-1.697C29.624,20.665,30.861,18.956,31.488,17.932z"/>
                            </svg>
                        }
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
