import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { clearRegisterStatus, postNewUser } from '../../redux/actions/users'
import {useFormik} from 'formik'
import validate from './ValidationRegister'
import {useHistory} from 'react-router-dom'


import style from '../../scss/components/Users/_register.module.scss'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

export default function Register() {
    let history = useHistory();
    const registerStatus = useSelector((state) => state.usersReducer.registerStatus)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues:{
            email:"",
            password:'',
            password2:'',
            firstname: '',
            lastname: '',
            username:''
        },
        validate,
        onSubmit: (values, {resetForm}) => {
                                            // reservation:[] es para crear usuarios que ya tengan algo añadido en el carrito previamente al registro.
            dispatch(postNewUser({user:values, reservations: []}))
            resetForm({values:''})
        }
    })


    // console.log('Esto es registerStatus -> ', registerStatus)

    const [type, setType] = useState('password')

    function handleClick(){
        setType(type === 'password' ? 'text' : 'password')
    }

    useEffect(()=>{
        if (registerStatus === 201) {
            alert(`User creation result was ${registerStatus} -> Successfully`)
            history.push('/login')
        }
        
        if (registerStatus && registerStatus !== 201) alert(`User creation result was ${registerStatus} -> Something went wrong :(`)


    }, [registerStatus])

  return (
    <div className={style.registerContainer}>
        <div className={style.imageContainer}>
            <Link to="/" className={style.navLogo}>
            <h2>HPFC</h2>
            {/* <svg
            width="36px"
            height="36px"
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            preserveAspectRatio="xMidYMid meet"
            >
            <path
                fill="#ff315a"
                d="M36 32a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v28z"
            ></path>
            <path
                fill="#FFF"
                d="M21 11a6 6 0 1 1-12 0a6 6 0 0 1 12 0zm10.999 2a5 5 0 1 1-10.001-.001A5 5 0 0 1 31.999 13z"
            ></path>
            <path
                fill="#FFF"
                d="M30 20a4 4 0 0 0-4-4H15a4 4 0 0 0-4 4l-6-4H4v13h1l6-4v2a4 4 0 0 0 4 4h11a4 4 0 0 0 4-4v-7z"
            ></path>
            </svg> */}
        </Link> 

        <h3>
            Enjoy without spoilers
        </h3>

        </div>

        <div className={style.formSideContainer}>
            <div className={style.formContainer}>
                <form onSubmit={formik.handleSubmit}>
                    <h1>Create account</h1>
                    <div className={style.inputContainer}>
                        <label>First name</label>
                        <input placeholder='John' type="text" name='firstname' value={formik.values.firstname} onChange={formik.handleChange} />
                        {
                            formik.errors.firstname ? <span className={style.errorMessage}>*{formik.errors.firstname}</span> : null
                        }
                    </div>
                    <div className={style.inputContainer}>
                        <label>Last name</label>
                        <input placeholder='Doe' type="text" name='lastname' value={formik.values.lastname} onChange={formik.handleChange} />
                        {
                            formik.errors.lastname ? <span className={style.errorMessage}>*{formik.errors.lastname}</span> : null
                        }
                    </div>
                    <div className={style.inputContainer}>
                        <label>User name</label>
                        <input placeholder='john_doe' type="text" name='username' value={formik.values.username} onChange={formik.handleChange} />
                        {
                            formik.errors.username ? <span className={style.errorMessage}>*{formik.errors.username}</span> : null
                        }
                    
                    </div>
                    <div className={style.inputContainer}>
                        <label>Email</label>
                        <input placeholder='john_doe@company.com' type="email" name='email' value={formik.values.email} onChange={formik.handleChange} />
                        {
                            formik.errors.email ? <span className={style.errorMessage}>*{formik.errors.email}</span> : null
                        }
                    </div>
                    <div className={style.inputContainer}>
                        <label>Password</label>
                        <input placeholder='Must have at least 8 characters' type={type} name='password' value={formik.values.password} onChange={formik.handleChange} />
                        {
                            formik.errors.password ? <span className={style.errorMessage}>*{formik.errors.password}</span> : null
                        }
                    </div>
                    <div className={style.inputContainer}>
                        <label>Confirm password</label>
                        <div className={style.passContainer}>
                        <input placeholder='Repeat the password above' id='password2' type={type} name='password2' value={formik.values.password2} onChange={formik.handleChange} />
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
                    
                        {
                            formik.errors.password2 ? <span className={style.errorMessage}>*{formik.errors.password2}</span> : null
                        }
                    </div>
                    <div className={style.btnContainer}>
                        <button className={style.primaryBtn} type='submit' disabled={Object.keys(formik.errors).length !== 0 ? true : false}>Create account</button>
                        <span>Or</span>
                        <div className={style.googleBtn}>
                            <div className={style.googleIconWrapper}>
                                <img className={style.googleIcon} src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="" />
                            </div>
                            <div className={style.btnText}>
                                <a href='https://pf-henry-back.herokuapp.com/auth/google'>Sign in with google</a>
                            </div>
                        </div>
                    </div>

                    <div className={style.linkToRegister}>Already have an account? 
                            <span>
                                <Link className={style.Link}to='/login'>Log in</Link>
                            </span>
                    </div>

                </form>
            </div>
        </div>
    </div>
  )
}


