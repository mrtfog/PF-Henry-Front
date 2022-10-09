import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'

export default function LoginTrucho() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {logIn}= useAuth()
    const history = useHistory()

    return (
        <div>
            <input type='email' value={email} onChange={e => setEmail(e.target.value)}/>
            <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>

            <button 
            onClick={()=>{
                logIn(email, password)
                history.push('/')
            }}>Log In</button>
        </div>
    )
}
