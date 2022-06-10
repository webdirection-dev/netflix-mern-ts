import React from "react"

import './login.scss'
import logo from '../../img/logo.png'

const Login: React.FC = () => {
    return(
        <div className='login'>
            <div className="top">
                <div className="wrapper">
                    <img className='logo' src={logo} alt="logo"/>
                </div>
            </div>

            <div className="container">
                <form>
                    <h1>Sing In</h1>

                    <input type="email" placeholder='Email or phone number'/>
                    <input type="password" placeholder='Password'/>
                    <button className='loginButton'>Sing In</button>

                    <span>New to Netflix? <b>Sing up now.</b></span>

                    <small>
                        This page is protected by Google reCAPTCHA to ensure you're not a bot. <b>Learn more</b>
                    </small>
                </form>
            </div>
        </div>
    )
}

export default Login