import React, {useRef, useState} from "react"

import './register.scss'
import logo from '../../img/logo.png'

const Register: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const handleStart = () => {
        if (emailRef.current !== null) setEmail(emailRef.current.value)
    }

    const handleFinish = () => {
        if (passwordRef.current !== null) setPassword(passwordRef.current.value)
    }

    return(
        <div className='register'>
            <div className="top">
                <div className="wrapper">
                    <img className='logo' src={logo} alt="logo"/>

                    <button className="loginButton">Sing In</button>
                </div>
            </div>

            <div className="container">
                <h1>Unlimited movies, TV shows and more.</h1>
                <h2>Watch anywhere. Cancel anytime.</h2>
                <p>Ready to watch? Enter your email to create or restart your membership.</p>

                {
                    !email ?
                        (
                            <div className="input">
                                <input type="email" placeholder='email address' ref={emailRef} />
                                <button className="registerButton" onClick={handleStart}>Get Started</button>
                            </div>
                        ) :
                        (
                            <form className="input">
                                <input type="password" placeholder='password' ref={passwordRef} />
                                <button className="registerButton" onClick={handleFinish}>Start</button>
                            </form>
                        )
                }
            </div>
        </div>
    )
}

export default Register