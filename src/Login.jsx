import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './SignUp.css'
import { auth } from './firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(e)
        try {
            await  signInWithEmailAndPassword ( auth, email, password)
            console.log('login succussfully')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='Signup-container'>
            <form className='SignUp' onSubmit={handleSubmit}>
                <h2>login</h2>
                <label htmlFor="email">
                    Email
                    <input type="email" onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label htmlFor="password">
                    Password
                    <input type="password" onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type="submit">Login</button> <br />
                <p>Don't have Account ? <Link to="/signup">Sign Up</Link></p>
            </form>
        </div>
    )
}

export default SignUp