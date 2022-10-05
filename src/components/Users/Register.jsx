import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getUserSession, postNewUser } from '../../redux/actions/users'
import {useFormik} from 'formik'
import validate from './ValidationFunction'


import style from '../../scss/components/Users/_register.module.scss'

export default function Register() {
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
        onSubmit: values => {
            dispatch(postNewUser(values))
            dispatch(getUserSession())
        }
    })
    
    const userSession = useSelector(state => state.userSession)

    const [type, setType] = useState('password')

    function handleClick(){
        setType(type === 'password' ? 'text' : 'password')
    }


  return (
    <div className={style.registerContainer}>
        <form onSubmit={formik.handleSubmit}>
            <div className={style.inputContainer}>
                <label>First name</label>
                <input type="text" name='firstname' value={formik.values.firstname} onChange={formik.handleChange} />
                {
                    formik.errors.firstname ? <span className={style.errorMessage}>*{formik.errors.firstname}</span> : null
                }
            </div>
            <div className={style.inputContainer}>
                <label>Last name</label>
                <input type="text" name='lastname' value={formik.values.lastname} onChange={formik.handleChange} />
                {
                    formik.errors.lastname ? <span className={style.errorMessage}>*{formik.errors.lastname}</span> : null
                }
            </div>
            <div className={style.inputContainer}>
                <label>User name</label>
                <input type="text" name='username' value={formik.values.username} onChange={formik.handleChange} />
                {
                    formik.errors.username ? <span className={style.errorMessage}>*{formik.errors.username}</span> : null
                }
               
            </div>
            <div className={style.inputContainer}>
                <label>Email</label>
                <input type="email" name='email' value={formik.values.email} onChange={formik.handleChange} />
                {
                    formik.errors.email ? <span className={style.errorMessage}>*{formik.errors.email}</span> : null
                }
            </div>
            <div className={style.inputContainer}>
                <label>Password</label>
                <div>
                <input type={type} name='password' value={formik.values.password} onChange={formik.handleChange} />
                </div>
                {
                    formik.errors.password ? <span className={style.errorMessage}>*{formik.errors.password}</span> : null
                }
            </div>
            <div className={style.inputContainer}>
                <label>Confirm password</label>
                <div>
                <input id='password2' type={type} name='password2' value={formik.values.password2} onChange={formik.handleChange} />
                <span id='showButton' className={style.showButton} onClick={handleClick}>
                        {
                            type === 'password' ? <svg width="22px" height="16px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <path d="M12,4.5 C7,4.5 2.73,7.61 1,12 C2.73,16.39 7,19.5 12,19.5 C17,19.5 21.27,16.39 23,12 C21.27,7.61 17,4.5 12,4.5 Z M12,17 C9.24,17 7,14.76 7,12 C7,9.24 9.24,7 12,7 C14.76,7 17,9.24 17,12 C17,14.76 14.76,17 12,17 Z M12,9 C10.34,9 9,10.34 9,12 C9,13.66 10.34,15 12,15 C13.66,15 15,13.66 15,12 C15,10.34 13.66,9 12,9 Z" id="🔹-Icon-Color"></path>
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"  stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        </svg>
                        }
                </span>
            </div>
                {
                    formik.errors.password2 ? <span className={style.errorMessage}>*{formik.errors.password2}</span> : null
                }
            </div>
            <button type='submit' disabled={Object.keys(formik.errors).length !== 0 ? true : false}> Register </button>
        </form>
            {
                userSession ? <div>
                    <span>{userSession} created successfully</span>
                </div>
                : null
            }
    </div>
  )
}


