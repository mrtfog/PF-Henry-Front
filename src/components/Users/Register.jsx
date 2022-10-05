import React from 'react'
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
    const userSession = useSelector(state=> state.userSession)
    // console.log(formik.errors)
    // console.log(formik.values.password)
    // console.log(formik.values.password2)
    //console.log(formik.values)

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
                <input type="password" name='password' value={formik.values.password} onChange={formik.handleChange} />
                {
                    formik.errors.password ? <span className={style.errorMessage}>*{formik.errors.password}</span> : null
                }
            </div>
            <div className={style.inputContainer}>
                <label>Confirm password</label>
                <input type="password" name='password2' value={formik.values.password2} onChange={formik.handleChange} />
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


