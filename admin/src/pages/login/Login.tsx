import React from "react"
import './login.scss'
import {useBgLogin} from "./use-bg-login"

const Login: React.FC = () => {
    const bg = useBgLogin()

    //дизайн страницы регистрации/авторизации
    // https://www.mockplus.com/blog/post/login-page-examples

    return(
        <div className='login'>
            <div className="container">
                <img src={bg} alt="img" className="img"/>

                <form className="loginForm">
                    <input
                        className='loginInput'
                        type="text"
                        placeholder='email'
                    />

                    <input
                        className='loginInput'
                        type="password"
                        placeholder='password'
                    />

                    <button className="loginBtn">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login